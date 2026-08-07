const { runQuery } = require('../config/db');

const getJobs = async (req, res) => {
  const { search = '' } = req.query;

  try {
    // Cypher query to fetch jobs and their required skills from CognoDB
    const cypher = `
      MATCH (j:Job)
      OPTIONAL MATCH (j)-[:REQUIRES_SKILL]->(s:Skill)
      RETURN j.jobId AS jobId, j.title AS title, j.company AS company, 
             j.location AS location, j.match AS match, collect(s.name) AS skills
    `;
    
    const records = await runQuery(cypher);
    
    let jobs = records.map(record => ({
      jobId: record.jobId,
      title: record.title,
      company: record.company,
      location: record.location,
      source: 'CognoDB Graph Aggregator',
      applyLink: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(record.title)}`,
      match: record.match || '85%',
      skills: record.skills || []
    }));

    // If search query is provided, filter them dynamically
    if (search && search.trim() !== '') {
      const query = search.toLowerCase();
      jobs = jobs.filter(j => 
        j.title.toLowerCase().includes(query) || 
        j.company.toLowerCase().includes(query) ||
        j.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });

  } catch (error) {
    console.error('Graph query failed, returning fallback:', error.message);
    return res.status(500).json({ success: false, message: "Error fetching graph jobs", jobs: [] });
  }
};

module.exports = { getJobs };