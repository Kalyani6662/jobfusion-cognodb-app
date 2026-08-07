const { driver } = require('./config/db');

async function seedData() {
  const session = driver.session();
  try {
    console.log("Seeding JobFusion graph data...");

    await session.run(`
      CREATE (u1:User {name: "Kalyani", email: "kalyani@gmail.com", profileCompleted: true})
      CREATE (u2:User {name: "Rahul", email: "rahul@gmail.com", profileCompleted: true})
      
      CREATE (j1:Job {title: "Full Stack Developer", company: "Wexa AI", location: "Remote"})
      CREATE (j2:Job {title: "Backend Engineer", company: "TechCorp", location: "Bengaluru"})
      
      CREATE (s1:Skill {name: "React"})
      CREATE (s2:Skill {name: "Node.js"})
      CREATE (s3:Skill {name: "Python"})

      CREATE (u1)-[:APPLIED_FOR]->(j1)
      CREATE (u2)-[:APPLIED_FOR]->(j2)
      
      CREATE (j1)-[:REQUIRES_SKILL]->(s1)
      CREATE (j1)-[:REQUIRES_SKILL]->(s2)
      CREATE (j2)-[:REQUIRES_SKILL]->(s3)
    `);

    console.log("Graph data seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await session.close();
    await driver.close();
    process.exit(0);
  }
}

seedData();