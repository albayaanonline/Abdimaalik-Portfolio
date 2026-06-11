export function downloadCV() {
  const cvHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Abdimaalik Hasan Mohamed - CV</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #fff;
      color: #1a1a2e;
      font-size: 13px;
      line-height: 1.6;
    }
    .page {
      max-width: 820px;
      margin: 0 auto;
      padding: 36px 44px;
    }
    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 3px solid #0891b2;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .header-left h1 {
      font-size: 28px;
      font-weight: 800;
      color: #0891b2;
      letter-spacing: -0.5px;
    }
    .header-left h2 {
      font-size: 14px;
      font-weight: 500;
      color: #475569;
      margin-top: 4px;
    }
    .header-right {
      text-align: right;
      font-size: 12px;
      color: #475569;
      line-height: 1.8;
    }
    .header-right a { color: #0891b2; text-decoration: none; }
    /* Sections */
    .section { margin-bottom: 22px; }
    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #0891b2;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 12px;
    }
    /* Summary */
    .summary p { color: #334155; }
    /* Skills grid */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .skill-group h4 {
      font-size: 11px;
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .skill-group ul { list-style: none; }
    .skill-group ul li {
      font-size: 12px;
      color: #475569;
      padding: 1px 0;
    }
    .skill-group ul li::before { content: "• "; color: #0891b2; }
    /* Projects */
    .project { margin-bottom: 14px; }
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .project h3 { font-size: 14px; font-weight: 700; color: #1a1a2e; }
    .project .tags {
      font-size: 11px;
      color: #0891b2;
      font-weight: 500;
    }
    .project p { color: #475569; margin-top: 2px; font-size: 12px; }
    /* Experience */
    .exp-item { margin-bottom: 14px; }
    .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
    .exp-item h3 { font-size: 14px; font-weight: 700; color: #1a1a2e; }
    .exp-item .period { font-size: 11px; color: #94a3b8; }
    .exp-item p { color: #475569; margin-top: 2px; font-size: 12px; }
    /* Contact row */
    .contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 12px;
      color: #475569;
    }
    .contact-row span { display: flex; align-items: center; gap: 4px; }
    @media print {
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      .page { padding: 20px 30px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <h1>Abdimaalik Hasan Mohamed</h1>
        <h2>Full Stack Web Developer &amp; AI Automation Builder</h2>
      </div>
      <div class="header-right">
        <div>&#9993; <a href="mailto:Adbulmaalikhasanmohamed@gmail.com">Adbulmaalikhasanmohamed@gmail.com</a></div>
        <div>&#128222; <a href="https://wa.me/252656042512">+252 656 042 512</a></div>
        <div>&#128279; <a href="https://github.com/ablayaanonline">github.com/ablayaanonline</a></div>
      </div>
    </div>

    <!-- Professional Summary -->
    <div class="section summary">
      <div class="section-title">Professional Summary</div>
      <p>
        Passionate Full Stack Web Developer and AI Automation Builder with 3+ years of hands-on experience designing and shipping modern web applications, AI-powered tools, and automated workflow systems. I bridge clean UI design with robust backend architecture to deliver scalable, high-performance digital products that solve real business problems.
      </p>
    </div>

    <!-- Skills -->
    <div class="section">
      <div class="section-title">Technical Skills</div>
      <div class="skills-grid">
        <div class="skill-group">
          <h4>Frontend</h4>
          <ul>
            <li>React / Next.js</li>
            <li>TypeScript / JavaScript</li>
            <li>Tailwind CSS</li>
            <li>HTML5 / CSS3</li>
          </ul>
        </div>
        <div class="skill-group">
          <h4>Backend &amp; Database</h4>
          <ul>
            <li>Node.js / Express.js</li>
            <li>REST APIs / Auth</li>
            <li>PostgreSQL / Supabase</li>
            <li>Firebase</li>
          </ul>
        </div>
        <div class="skill-group">
          <h4>AI &amp; Automation</h4>
          <ul>
            <li>OpenAI / AI Agents</li>
            <li>Make.com Workflows</li>
            <li>Chatbot Development</li>
            <li>Workflow Automation</li>
          </ul>
        </div>
        <div class="skill-group">
          <h4>Cloud &amp; DevOps</h4>
          <ul>
            <li>Vercel / Netlify</li>
            <li>GitHub / Replit</li>
          </ul>
        </div>
        <div class="skill-group">
          <h4>Design &amp; Other</h4>
          <ul>
            <li>UI/UX Design</li>
            <li>SEO Optimization</li>
            <li>Performance Tuning</li>
            <li>Responsive Design</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Projects -->
    <div class="section">
      <div class="section-title">Featured Projects</div>
      <div class="project">
        <div class="project-header">
          <h3>Quran Learning Platform</h3>
          <span class="tags">React · Node.js · PostgreSQL</span>
        </div>
        <p>Interactive Quran learning platform with progress tracking, lesson management, and a modern user experience designed for both beginners and advanced learners.</p>
      </div>
      <div class="project">
        <div class="project-header">
          <h3>AI WhatsApp Agent</h3>
          <span class="tags">OpenAI · Node.js · Make.com</span>
        </div>
        <p>AI-powered WhatsApp assistant capable of autonomously answering messages, handling customer queries, and automating multi-step conversations.</p>
      </div>
      <div class="project">
        <div class="project-header">
          <h3>Business Management System</h3>
          <span class="tags">React · Express · PostgreSQL</span>
        </div>
        <p>Full-featured digital business management platform with analytics dashboards, reporting modules, and role-based access control.</p>
      </div>
      <div class="project">
        <div class="project-header">
          <h3>Online Learning Platform</h3>
          <span class="tags">Next.js · TypeScript · Supabase</span>
        </div>
        <p>Educational platform featuring structured courses, interactive quizzes, and rich student dashboards with progress tracking.</p>
      </div>
    </div>

    <!-- Experience -->
    <div class="section">
      <div class="section-title">Experience</div>
      <div class="exp-item">
        <div class="exp-header">
          <h3>Freelance Full Stack Web Developer</h3>
          <span class="period">2022 – Present</span>
        </div>
        <p>Designing, building, and delivering production-ready web applications and custom solutions for clients across multiple industries and countries.</p>
      </div>
      <div class="exp-item">
        <div class="exp-header">
          <h3>AI Automation Specialist</h3>
          <span class="period">2023 – Present</span>
        </div>
        <p>Building AI-powered workflow systems, chatbots, and automated pipelines using OpenAI APIs, Make.com, and custom agent frameworks.</p>
      </div>
      <div class="exp-item">
        <div class="exp-header">
          <h3>Personal Product Development</h3>
          <span class="period">2022 – Present</span>
        </div>
        <p>Designing and launching original digital products including educational platforms and SaaS tools.</p>
      </div>
      <div class="exp-item">
        <div class="exp-header">
          <h3>Open Source Contributor</h3>
          <span class="period">2023 – Present</span>
        </div>
        <p>Contributing to developer tools, documentation, and community open source repositories on GitHub.</p>
      </div>
    </div>

    <!-- Contact -->
    <div class="section">
      <div class="section-title">Contact</div>
      <div class="contact-row">
        <span>&#9993; Adbulmaalikhasanmohamed@gmail.com</span>
        <span>&#128222; +252 656 042 512 (WhatsApp)</span>
        <span>&#128279; github.com/abdimaalik-hasan-mohamed</span>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() { window.print(); }
  </script>
</body>
</html>`;

  const blob = new Blob([cvHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) {
    win.onload = () => URL.revokeObjectURL(url);
  }
}
