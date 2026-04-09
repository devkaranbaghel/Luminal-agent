import { prisma } from "../config/db";

export class JobsService {
  /**
   * Generates a realistic mock job into the `ScrapedJob` table to simulate
   * an external scraper finding fresh openings.
   */
  static async simulateIncomingJob(userId: string) {
    const titles = ["Senior Frontend Developer", "Backend Engineer", "Full Stack Developer", "Data Scientist", "React Engineer"];
    const companies = ["Stripe", "Google", "Vercel", "Acme Corp", "TechPulse", "DataFlow Inc"];
    const locations = ["San Francisco, CA", "Remote", "New York, NY", "London, UK"];
    
    // Pick random details
    const randomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    
    const title = randomItem(titles);
    const company = randomItem(companies);
    const location = randomItem(locations);
    const externalUrl = `https://careers.${company.toLowerCase().replace(/\\s/g, '')}.com/jobs/${Math.floor(Math.random() * 100000)}`;

    const newJob = await prisma.scrapedJob.create({
      data: {
        userId,
        title,
        company,
        location,
        status: "NEW", // The worker will pick up "NEW" jobs
        source: "LinkedIn (Mocked)",
        externalUrl,
      }
    });

    console.log(`[Job Scraper] Found new job: ${title} at ${company}`);
    return newJob;
  }
}
