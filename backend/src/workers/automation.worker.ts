import cron from 'node-cron';
import { prisma } from '../config/db';
import { AIService } from '../services/ai.service';
import { AutomationService } from '../services/automation.service';

export class AutomationWorker {
  /**
   * Initializes the infinite background loop.
   * Runs every 30 seconds to orchestrate the pipeline.
   */
  static start() {
    console.log("[Orchestrator] Automation Worker initialized.");

    cron.schedule('*/30 * * * * *', async () => {
      try {
        await this.sweepAndMatch();
      } catch (error) {
        console.error("[Orchestrator] Error during sweep:", error);
      }
    });
  }

  private static async sweepAndMatch() {
    // 1. Find all NEW jobs that haven't been matched yet.
    const newJobs = await prisma.scrapedJob.findMany({
      where: { status: "NEW" },
      take: 5
    });

    if (newJobs.length === 0) return;

    for (const job of newJobs) {
      // 2. Fetch the user's Profile Data to evaluate against
      const userProfile = await prisma.profile.findUnique({
        where: { userId: job.userId },
        include: { skills: true, experience: true }
      });

      if (!userProfile) {
        // Not enough data to match
        await prisma.scrapedJob.update({
          where: { id: job.id },
          data: { status: "DISCARDED" }
        });
        continue;
      }

      const profileString = `Headline: ${userProfile.headline}
Skills: ${userProfile.skills.map((s: any) => s.name).join(', ')}
Experience: ${userProfile.experience.map((e: any) => e.title).join(', ')}`;

      const jobString = `Title: ${job.title} at ${job.company}`;

      // 3. Score the match using Gemini
      console.log(`[Matching] Scoring ${job.title} for user ${job.userId}...`);
      const score = await AIService.scoreJobMatch(jobString, profileString);

      // 4. Determine execution path based on score
      if (score >= 75) {
        console.log(`[Matching] ✨ High Match (${score}%) - Auto Applying!`);
        
        // Update Job Status to tracked
        await prisma.scrapedJob.update({
          where: { id: job.id },
          data: { status: "RANKED", matchScore: score }
        });

        // Push an actual Application into the Pipeline
        await AutomationService.startApplication(job.userId, { 
          title: job.title, 
          company: job.company 
        });

      } else {
        console.log(`[Matching] Low Match (${score}%) - Discarding.`);
        await prisma.scrapedJob.update({
          where: { id: job.id },
          data: { status: "DISCARDED", matchScore: score }
        });
      }
    }
  }
}
