interface ResumeItem{
    id: number;
    title: string;
    html: string;
    image?: any;
}


export const resumes: ResumeItem[] = [
     {
        title: "Classic Elegance",
        id: 1,
         image:require('@/assets/images/resume1.png'),
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              line-height: 1.6;
            }
            .container {
              padding: 20px;
              max-width: 800px;
              margin: auto;
              background: #f7f7f7;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              color: #333;
            }
            .header p {
              margin: 0;
              font-size: 16px;
              color: #666;
            }
            .section {
              margin-bottom: 20px;
            }
            .section h2 {
              font-size: 20px;
              color: #444;
              margin-bottom: 10px;
              border-bottom: 2px solid #ccc;
              padding-bottom: 5px;
            }
            .item {
              margin-bottom: 10px;
            }
            .item span {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>{{fullName}}</h1>
              {{#if email}}<p>Email: {{email}}</p>{{/if}}
              {{#if phone}}<p>Phone: {{phone}}</p>{{/if}}
              {{#if address}}<p>Address: {{address}}</p>{{/if}}
            </div>
            {{#if summary}}
            <div class="section">
              <h2>Summary</h2>
              <p>{{summary}}</p>
            </div>
            {{/if}}
            {{#if experience.length}}
            <div class="section">
              <h2>Experience</h2>
              {{#each experience}}
              <div class="item">
                <span>{{role}}</span> at <span>{{company}}</span> ({{startDate}} - {{endDate}})
                <p>{{description}}</p>
              </div>
              {{/each}}
            </div>
            {{/if}}
            {{#if education.length}}
            <div class="section">
              <h2>Education</h2>
              {{#each education}}
              <div class="item">
                <span>{{degree}}</span>, <span>{{institution}}</span> ({{graduationYear}})
              </div>
              {{/each}}
            </div>
            {{/if}}
            {{#if skills.length}}
            <div class="section">
              <h2>Skills</h2>
              <p>{{skills.join(', ')}}</p>
            </div>
            {{/if}}
          </div>
        </body>
      </html>
    `,
  },
  {
      title: "Modern Professional",
       id: 2,
         image:require('@/assets/images/resume2.png'),
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Roboto', sans-serif;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              padding: 30px;
              max-width: 900px;
              margin: auto;
              background: #fff;
              border: 1px solid #ddd;
              border-radius: 12px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 25px;
            }
            .header h1 {
              font-size: 30px;
              color: #2a2a2a;
            }
            .section h2 {
              font-size: 22px;
              color: #444;
              margin-bottom: 10px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .section {
              margin-bottom: 30px;
            }
            .section .item {
              margin-bottom: 15px;
            }
            .section .item span {
              font-weight: bold;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>{{fullName}}</h1>
              {{#if email}}<p>Email: {{email}}</p>{{/if}}
              {{#if phone}}<p>Phone: {{phone}}</p>{{/if}}
            </div>
            {{#if summary}}
            <div class="section">
              <h2>Summary</h2>
              <p>{{summary}}</p>
            </div>
            {{/if}}
            {{#if experience.length}}
            <div class="section">
              <h2>Experience</h2>
              {{#each experience}}
              <div class="item">
                <span>{{role}} at {{company}}</span>
                <span>{{startDate}} - {{endDate}}</span>
                <p>{{description}}</p>
              </div>
              {{/each}}
            </div>
            {{/if}}
            {{#if education.length}}
            <div class="section">
              <h2>Education</h2>
              {{#each education}}
              <div class="item">
                <span>{{degree}} at {{institution}}</span>
                <span>Graduated: {{graduationYear}}</span>
              </div>
              {{/each}}
            </div>
            {{/if}}
            {{#if skills.length}}
            <div class="section">
              <h2>Skills</h2>
              <p>{{skills.join(', ')}}</p>
            </div>
            {{/if}}
          </div>
        </body>
      </html>
    `,
    },
  {
      title: "Corporate Style",
      id: 3,
    image:require('@/assets/images/resume3.png'),
  html: `
    <html>
      <head>
        <style>
          body {
            font-family: 'Times New Roman', serif;
            margin: 0;
            padding: 0;
            background: #eee;
            color: #000;
          }
          .container {
            max-width: 850px;
            margin: 20px auto;
            padding: 25px;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            font-size: 26px;
            margin: 0;
          }
          .header p {
            font-size: 14px;
            margin: 5px 0;
          }
          .section {
            margin-bottom: 20px;
          }
          .section h2 {
            font-size: 18px;
            color: #333;
            border-bottom: 1px solid #ddd;
            margin-bottom: 10px;
          }
          .item {
            margin-bottom: 10px;
          }
          .item p {
            margin: 0;
          }
          .item span {
            display: block;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>{{fullName}}</h1>
            {{#if email}}<p>Email: {{email}}</p>{{/if}}
            {{#if phone}}<p>Phone: {{phone}}</p>{{/if}}
          </div>
          {{#if summary}}
          <div class="section">
            <h2>Summary</h2>
            <p>{{summary}}</p>
          </div>
          {{/if}}
          {{#if experience.length}}
          <div class="section">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="item">
              <span>{{role}} at {{company}}</span>
              <span>{{startDate}} - {{endDate}}</span>
              <p>{{description}}</p>
            </div>
            {{/each}}
          </div>
          {{/if}}
          {{#if education.length}}
          <div class="section">
            <h2>Education</h2>
            {{#each education}}
            <div class="item">
              <span>{{degree}}</span>
              <p>{{institution}} ({{graduationYear}})</p>
            </div>
            {{/each}}
          </div>
          {{/if}}
          {{#if skills.length}}
          <div class="section">
            <h2>Skills</h2>
            <p>{{skills.join(', ')}}</p>
          </div>
          {{/if}}
        </div>
      </body>
    </html>
  `,
    },
  {
        title: "Classic Elegance",
        id: 4,
         image:require('@/assets/images/resume1.png'),
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              line-height: 1.6;
            }
            .container {
              padding: 20px;
              max-width: 800px;
              margin: auto;
              background: #f7f7f7;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              color: #333;
            }
            .header p {
              margin: 0;
              font-size: 16px;
              color: #666;
            }
            .section {
              margin-bottom: 20px;
            }
            .section h2 {
              font-size: 20px;
              color: #444;
              margin-bottom: 10px;
              border-bottom: 2px solid #ccc;
              padding-bottom: 5px;
            }
            .item {
              margin-bottom: 10px;
            }
            .item span {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>{{fullName}}</h1>
              {{#if email}}<p>Email: {{email}}</p>{{/if}}
              {{#if phone}}<p>Phone: {{phone}}</p>{{/if}}
              {{#if address}}<p>Address: {{address}}</p>{{/if}}
            </div>
            {{#if summary}}
            <div class="section">
              <h2>Summary</h2>
              <p>{{summary}}</p>
            </div>
            {{/if}}
            {{#if experience.length}}
            <div class="section">
              <h2>Experience</h2>
              {{#each experience}}
              <div class="item">
                <span>{{role}}</span> at <span>{{company}}</span> ({{startDate}} - {{endDate}})
                <p>{{description}}</p>
              </div>
              {{/each}}
            </div>
            {{/if}}
            {{#if education.length}}
            <div class="section">
              <h2>Education</h2>
              {{#each education}}
              <div class="item">
                <span>{{degree}}</span>, <span>{{institution}}</span> ({{graduationYear}})
              </div>
              {{/each}}
            </div>
            {{/if}}
            {{#if skills.length}}
            <div class="section">
              <h2>Skills</h2>
              <p>{{skills.join(', ')}}</p>
            </div>
            {{/if}}
          </div>
        </body>
      </html>
    `,
  },

]


// templates/resumeTemplates.js
// export const templates = {
//   modern: (data) => `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//             * {
//                 margin: 0;
//                 padding: 0;
//                 box-sizing: border-box;
//                 font-family: 'Helvetica Neue', Arial, sans-serif;
//             }
            
//             body {
//                 background: #fff;
//                 color: #333;
//                 line-height: 1.6;
//             }
            
//             .container {
//                 max-width: 900px;
//                 margin: 0 auto;
//                 padding: 40px 20px;
//             }
            
//             .header {
//                 display: flex;
//                 align-items: center;
//                 gap: 40px;
//                 margin-bottom: 50px;
//                 padding-bottom: 30px;
//                 border-bottom: 3px solid #2C3E50;
//             }
            
//             .profile-photo {
//                 width: 150px;
//                 height: 150px;
//                 border-radius: 75px;
//                 object-fit: cover;
//                 border: 4px solid #2C3E50;
//             }
            
//             .header-content h1 {
//                 font-size: 42px;
//                 font-weight: 700;
//                 color: #2C3E50;
//                 margin-bottom: 10px;
//             }
            
//             .contact-info {
//                 display: flex;
//                 gap: 20px;
//                 color: #666;
//                 font-size: 16px;
//             }
            
//             .section {
//                 margin: 40px 0;
//             }
            
//             .section-title {
//                 font-size: 24px;
//                 color: #2C3E50;
//                 margin-bottom: 20px;
//                 position: relative;
//                 display: inline-block;
//             }
            
//             .section-title::after {
//                 content: '';
//                 position: absolute;
//                 bottom: -5px;
//                 left: 0;
//                 width: 100%;
//                 height: 3px;
//                 background: #3498db;
//             }
            
//             .about {
//                 font-size: 18px;
//                 color: #555;
//                 line-height: 1.8;
//             }
            
//             .experience-item {
//                 margin-bottom: 30px;
//                 padding: 20px;
//                 background: #f8f9fa;
//                 border-radius: 10px;
//                 border-left: 4px solid #3498db;
//             }
            
//             .experience-header {
//                 display: flex;
//                 justify-content: space-between;
//                 margin-bottom: 10px;
//             }
            
//             .company {
//                 font-size: 20px;
//                 font-weight: 600;
//                 color: #2C3E50;
//             }
            
//             .date {
//                 color: #666;
//             }
            
//             .position {
//                 font-size: 18px;
//                 color: #3498db;
//                 margin-bottom: 10px;
//             }
            
//             .skills-grid {
//                 display: flex;
//                 flex-wrap: wrap;
//                 gap: 15px;
//             }
            
//             .skill-item {
//                 background: #2C3E50;
//                 color: white;
//                 padding: 8px 16px;
//                 border-radius: 20px;
//                 font-size: 16px;
//             }
            
//             .achievements-list {
//                 list-style: none;
//             }
            
//             .achievement-item {
//                 margin-bottom: 15px;
//                 padding-left: 24px;
//                 position: relative;
//             }
            
//             .achievement-item::before {
//                 content: '•';
//                 color: #3498db;
//                 font-size: 24px;
//                 position: absolute;
//                 left: 0;
//                 top: -4px;
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <header class="header">
//                 ${data.personalInfo.photo ? `
//                     <img src="${data.personalInfo.photo}" alt="Profile Photo" class="profile-photo">
//                 ` : ''}
//                 <div class="header-content">
//                     <h1>${data.personalInfo.name || ''}</h1>
//                     <div class="contact-info">
//                         ${data.personalInfo.email ? `<span>${data.personalInfo.email}</span>` : ''}
//                         ${data.personalInfo.phone ? `<span>|</span><span>${data.personalInfo.phone}</span>` : ''}
//                     </div>
//                 </div>
//             </header>

//             ${data.personalInfo.about ? `
//                 <section class="section">
//                     <h2 class="section-title">About</h2>
//                     <div class="about">${data.personalInfo.about}</div>
//                 </section>
//             ` : ''}

//             ${data.experiences && data.experiences.length > 0 ? `
//                 <section class="section">
//                     <h2 class="section-title">Experience</h2>
//                     ${data.experiences.map(exp => `
//                         <div class="experience-item">
//                             <div class="experience-header">
//                                 <span class="company">${exp.company}</span>
//                                 <span class="date">${exp.date}</span>
//                             </div>
//                             <div class="position">${exp.position}</div>
//                             <div class="description">${exp.description}</div>
//                         </div>
//                     `).join('')}
//                 </section>
//             ` : ''}

//             ${data.skills && data.skills.length > 0 ? `
//                 <section class="section">
//                     <h2 class="section-title">Skills</h2>
//                     <div class="skills-grid">
//                         ${data.skills.map(skill => `
//                             <span class="skill-item">${skill}</span>
//                         `).join('')}
//                     </div>
//                 </section>
//             ` : ''}

//             ${data.achievements && data.achievements.length > 0 ? `
//                 <section class="section">
//                     <h2 class="section-title">Achievements</h2>
//                     <ul class="achievements-list">
//                         ${data.achievements.map(achievement => `
//                             <li class="achievement-item">${achievement}</li>
//                         `).join('')}
//                     </ul>
//                 </section>
//             ` : ''}
//         </div>
//     </body>
//     </html>
//   `,

//   minimal: (data) => `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//             * {
//                 margin: 0;
//                 padding: 0;
//                 box-sizing: border-box;
//                 font-family: 'Inter', -apple-system, sans-serif;
//             }
            
//             body {
//                 background: #fff;
//                 color: #2d3436;
//                 line-height: 1.6;
//             }
            
//             .container {
//                 max-width: 800px;
//                 margin: 0 auto;
//                 padding: 60px 20px;
//             }
            
//             .header {
//                 text-align: center;
//                 margin-bottom: 60px;
//             }
            
//             .profile-photo {
//                 width: 120px;
//                 height: 120px;
//                 border-radius: 60px;
//                 object-fit: cover;
//                 margin-bottom: 20px;
//             }
            
//             .name {
//                 font-size: 36px;
//                 font-weight: 700;
//                 letter-spacing: -0.5px;
//                 margin-bottom: 15px;
//             }
            
//             .contact-info {
//                 color: #636e72;
//                 font-size: 16px;
//             }
            
//             .divider {
//                 width: 40px;
//                 height: 4px;
//                 background: #0984e3;
//                 margin: 40px auto;
//             }
            
//             .section {
//                 margin: 40px 0;
//             }
            
//             .section-title {
//                 font-size: 20px;
//                 font-weight: 600;
//                 text-transform: uppercase;
//                 letter-spacing: 2px;
//                 color: #0984e3;
//                 margin-bottom: 25px;
//             }
            
//             .about {
//                 font-size: 18px;
//                 color: #2d3436;
//                 max-width: 600px;
//                 margin: 0 auto;
//                 text-align: center;
//             }
            
//             .experience-item {
//                 margin-bottom: 40px;
//             }
            
//             .experience-header {
//                 margin-bottom: 10px;
//             }
            
//             .company {
//                 font-size: 20px;
//                 font-weight: 600;
//             }
            
//             .date {
//                 color: #636e72;
//                 font-size: 14px;
//             }
            
//             .position {
//                 font-size: 16px;
//                 color: #0984e3;
//                 margin-bottom: 10px;
//             }
            
//             .skills-container {
//                 text-align: center;
//             }
            
//             .skill-item {
//                 display: inline-block;
//                 margin: 5px;
//                 padding: 8px 16px;
//                 background: #f1f2f6;
//                 border-radius: 20px;
//                 font-size: 14px;
//                 color: #2d3436;
//             }
            
//             .achievements-list {
//                 max-width: 600px;
//                 margin: 0 auto;
//                 list-style: none;
//             }
            
//             .achievement-item {
//                 margin-bottom: 15px;
//                 padding-left: 20px;
//                 position: relative;
//             }
            
//             .achievement-item::before {
//                 content: '—';
//                 position: absolute;
//                 left: 0;
//                 color: #0984e3;
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <header class="header">
//                 ${data.personalInfo.photo ? `
//                     <img src="${data.personalInfo.photo}" alt="Profile Photo" class="profile-photo">
//                 ` : ''}
//                 <h1 class="name">${data.personalInfo.name || ''}</h1>
//                 <div class="contact-info">
//                     ${data.personalInfo.email ? `${data.personalInfo.email}` : ''}
//                     ${data.personalInfo.email && data.personalInfo.phone ? ' • ' : ''}
//                     ${data.personalInfo.phone ? `${data.personalInfo.phone}` : ''}
//                 </div>
//             </header>

//             ${data.personalInfo.about ? `
//                 <div class="divider"></div>
//                 <section class="section">
//                     <div class="about">${data.personalInfo.about}</div>
//                 </section>
//             ` : ''}

//             ${data.experiences && data.experiences.length > 0 ? `
//                 <div class="divider"></div>
//                 <section class="section">
//                     <h2 class="section-title">Experience</h2>
//                     ${data.experiences.map(exp => `
//                         <div class="experience-item">
//                             <div class="experience-header">
//                                 <span class="company">${exp.company}</span>
//                                 <span class="date"> • ${exp.date}</span>
//                             </div>
//                             <div class="position">${exp.position}</div>
//                             <div class="description">${exp.description}</div>
//                         </div>
//                     `).join('')}
//                 </section>
//             ` : ''}

//             ${data.skills && data.skills.length > 0 ? `
//                 <div class="divider"></div>
//                 <section class="section">
//                     <h2 class="section-title">Skills</h2>
//                     <div class="skills-container">
//                         ${data.skills.map(skill => `
//                             <span class="skill-item">${skill}</span>
//                         `).join('')}
//                     </div>
//                 </section>
//             ` : ''}

//             ${data.achievements && data.achievements.length > 0 ? `
//                 <div class="divider"></div>
//                 <section class="section">
//                     <h2 class="section-title">Achievements</h2>
//                     <ul class="achievements-list">
//                         ${data.achievements.map(achievement => `
//                             <li class="achievement-item">${achievement}</li>
//                         `).join('')}
//                     </ul>
//                 </section>
//             ` : ''}
//         </div>
//     </body>
//     </html>
//   `,

//   creative: (data) => `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//             * {
//                 margin: 0;
//                 padding: 0;
//                 box-sizing: border-box;
//                 font-family: 'SF Pro Display', -apple-system, sans-serif;
//             }
            
//             body {
//                 background: #ffffff;
//                 color: #2d3436;
//                 line-height: 1.6;
//             }
            
//             .container {
//                 display: grid;
//                 grid-template-columns: 300px 1fr;
//                 min-height: 100vh;
//             }
            
//             .sidebar {
//                 background: #6c5ce7;
//                 color: white;
//                 padding: 40px;
//             }
            
//             .profile-photo {
//                 width: 200px;
//                 height: 200px;
//                 border-radius: 20px;
//                 object-fit: cover;
//                 margin-bottom: 30px;
//             }
            
//             .name {
//                 font-size: 32px;
//                 font-weight: 700;
//                 margin-bottom: 15px;
//             }
            
//             .contact-info {
//                 margin-bottom: 40px;
//             }
            
//             .contact-item {
//                 margin-bottom: 10px;
//                 font-size: 14px;
//                 opacity: 0.9;
//             }
            
//             .main-content {
//                 padding: 60px;
//             }
            
//             .section {
//                 margin-bottom: 50px;
//             }
            
//             .section-title {
//                 font-size: 24px;
//                 font-weight: 700;
//                 color: #6c5ce7;
//                 margin-bottom: 25px;
//                 position: relative;
//                 padding-left: 20px;
//             }
            
//             .section-title::before {
//                 content: '';
//                 position: absolute;
//                 left: 0;
//                 top: 50%;
//                 transform: translateY(-50%);
//                 width: 8px;
//                 height: 30px;
//                 background: #6c5ce7;
//                 border-radius: 4px;
//             }
            
//             .about {
//                 font-size: 16px;
//                 color: #2d3436;
//                 line-height: 1.8;
//             }
            
//             .experience-item {
//                 margin-bottom: 30px;
//                 padding: 25px;
//                 background: #f8f9fa;
//                 border-radius: 15px;
//                 position: relative;
//                 overflow: hidden;
//             }
//   .experience-item::before {
//                 content: '';
//                 position: absolute;
//                 left: 0;
//                 top: 0;
//                 width: 4px;
//                 height: 100%;
//                 background: #6c5ce7;
//             }
            
//             .experience-header {
//                 display: flex;
//                 justify-content: space-between;
//                 margin-bottom: 15px;
//             }
            
//             .company {
//                 font-size: 20px;
//                 font-weight: 600;
//                 color: #2d3436;
//             }
            
//             .date {
//                 color: #6c5ce7;
//                 font-size: 14px;
//                 font-weight: 500;
//             }
            
//             .position {
//                 font-size: 16px;
//                 color: #6c5ce7;
//                 margin-bottom: 10px;
//             }
            
//             .skills-grid {
//                 display: grid;
//                 grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
//                 gap: 15px;
//             }
            
//             .skill-item {
//                 background: #f8f9fa;
//                 padding: 15px;
//                 border-radius: 10px;
//                 font-size: 14px;
//                 position: relative;
//                 padding-left: 35px;
//             }
            
//             .skill-item::before {
//                 content: '•';
//                 position: absolute;
//                 left: 15px;
//                 color: #6c5ce7;
//                 font-size: 20px;
//             }
            
//             .achievements-list {
//                 list-style: none;
//             }
            
//             .achievement-item {
//                 margin-bottom: 20px;
//                 padding: 20px;
//                 background: #f8f9fa;
//                 border-radius: 10px;
//                 position: relative;
//                 padding-left: 40px;
//             }
            
//             .achievement-item::before {
//                 content: '★';
//                 position: absolute;
//                 left: 15px;
//                 color: #6c5ce7;
//             }
            
//             @media (max-width: 768px) {
//                 .container {
//                     grid-template-columns: 1fr;
//                 }
                
//                 .sidebar {
//                     padding: 30px;
//                     text-align: center;
//                 }
                
//                 .main-content {
//                     padding: 30px;
//                 }
                
//                 .profile-photo {
//                     width: 150px;
//                     height: 150px;
//                 }
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <div class="sidebar">
//                 ${data.personalInfo.photo ? `
//                     <img src="${data.personalInfo.photo}" alt="Profile Photo" class="profile-photo">
//                 ` : ''}
//                 <h1 class="name">${data.personalInfo.name || ''}</h1>
//                 <div class="contact-info">
//                     ${data.personalInfo.email ? `
//                         <div class="contact-item">${data.personalInfo.email}</div>
//                     ` : ''}
//                     ${data.personalInfo.phone ? `
//                         <div class="contact-item">${data.personalInfo.phone}</div>
//                     ` : ''}
//                 </div>

//                 ${data.skills && data.skills.length > 0 ? `
//                     <div class="sidebar-section">
//                         <h2 class="sidebar-title">Skills</h2>
//                         <div class="sidebar-skills">
//                             ${data.skills.map(skill => `
//                                 <div class="sidebar-skill">${skill}</div>
//                             `).join('')}
//                         </div>
//                     </div>
//                 ` : ''}
//             </div>

//             <div class="main-content">
//                 ${data.personalInfo.about ? `
//                     <section class="section">
//                         <h2 class="section-title">About</h2>
//                         <div class="about">${data.personalInfo.about}</div>
//                     </section>
//                 ` : ''}

//                 ${data.experiences && data.experiences.length > 0 ? `
//                     <section class="section">
//                         <h2 class="section-title">Experience</h2>
//                         ${data.experiences.map(exp => `
//                             <div class="experience-item">
//                                 <div class="experience-header">
//                                     <span class="company">${exp.company}</span>
//                                     <span class="date">${exp.date}</span>
//                                 </div>
//                                 <div class="position">${exp.position}</div>
//                                 <div class="description">${exp.description}</div>
//                             </div>
//                         `).join('')}
//                     </section>
//                 ` : ''}

//                 ${data.achievements && data.achievements.length > 0 ? `
//                     <section class="section">
//                         <h2 class="section-title">Achievements</h2>
//                         <ul class="achievements-list">
//                             ${data.achievements.map(achievement => `
//                                 <li class="achievement-item">${achievement}</li>
//                             `).join('')}
//                         </ul>
//                     </section>
//                 ` : ''}
//             </div>
//         </div>
//     </body>
//     </html>
//   `
// };
export const templates = {
  modern: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Helvetica Neue', Arial, sans-serif;
            }
            
            body {
                background: #fff;
                color: #333;
                line-height: 1.6;
            }
            
            .container {
                max-width: 900px;
                margin: 0 auto;
                padding: 40px 20px;
            }
            
            .header {
                display: flex;
                align-items: center;
                gap: 40px;
                margin-bottom: 50px;
                padding-bottom: 30px;
                border-bottom: 3px solid #2C3E50;
            }
            
            .profile-photo {
                width: 150px;
                height: 150px;
                border-radius: 75px;
                object-fit: cover;
                border: 4px solid #2C3E50;
            }
            
            .header-content h1 {
                font-size: 42px;
                font-weight: 700;
                color: #2C3E50;
                margin-bottom: 10px;
            }
            
            .contact-info {
                display: flex;
                gap: 20px;
                color: #666;
                font-size: 16px;
            }
            
            .section {
                margin: 40px 0;
            }
            
            .section-title {
                font-size: 24px;
                color: #2C3E50;
                margin-bottom: 20px;
                position: relative;
                display: inline-block;
            }
            
            .section-title::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 100%;
                height: 3px;
                background: #3498db;
            }
            
            .about {
                font-size: 18px;
                color: #555;
                line-height: 1.8;
            }
            
            .experience-item {
                margin-bottom: 30px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
                border-left: 4px solid #3498db;
            }
            
            .experience-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
            }
            
            .company {
                font-size: 20px;
                font-weight: 600;
                color: #2C3E50;
            }
            
            .date {
                color: #666;
            }
            
            .position {
                font-size: 18px;
                color: #3498db;
                margin-bottom: 10px;
            }
            
            .skills-grid, .hobbies-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
            }
            
            .skill-item, .hobby-item {
                background: #2C3E50;
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 16px;
            }
            
            .achievements-list {
                list-style: none;
            }
            
            .achievement-item {
                margin-bottom: 15px;
                padding-left: 24px;
                position: relative;
            }
            
            .achievement-item::before {
                content: '•';
                color: #3498db;
                font-size: 24px;
                position: absolute;
                left: 0;
                top: -4px;
            }
            
            .language-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }
            
            .language-name {
                font-weight: 600;
                color: #2C3E50;
            }
            
            .language-level {
                color: #3498db;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header class="header">
                ${data.personalInfo.photo ? `
                    <img src="${data.personalInfo.photo}" alt="Profile Photo" class="profile-photo">
                ` : ''}
                <div class="header-content">
                    <h1>${data.personalInfo.name || ''}</h1>
                    <div class="contact-info">
                        ${data.personalInfo.email ? `<span>${data.personalInfo.email}</span>` : ''}
                        ${data.personalInfo.phone ? `<span>|</span><span>${data.personalInfo.phone}</span>` : ''}
                    </div>
                </div>
            </header>

            ${data.personalInfo.about ? `
                <section class="section">
                    <h2 class="section-title">About</h2>
                    <div class="about">${data.personalInfo.about}</div>
                </section>
            ` : ''}

            ${data.experiences && data.experiences.length > 0 ? `
                <section class="section">
                    <h2 class="section-title">Experience</h2>
                    ${data.experiences.map(exp => `
                        <div class="experience-item">
                            <div class="experience-header">
                                <span class="company">${exp.company}</span>
                                <span class="date">${exp.date}</span>
                            </div>
                            <div class="position">${exp.position}</div>
                            <div class="description">${exp.description}</div>
                        </div>
                    `).join('')}
                </section>
            ` : ''}

            ${data.skills && data.skills.length > 0 ? `
                <section class="section">
                    <h2 class="section-title">Skills</h2>
                    <div class="skills-grid">
                        ${data.skills.map(skill => `
                            <span class="skill-item">${skill}</span>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            ${data.languages && data.languages.length > 0 ? `
                <section class="section">
                    <h2 class="section-title">Languages</h2>
                    <div class="languages-grid">
                        ${data.languages.map(lang => `
                            <div class="language-item">
                                <span class="language-name">${lang.name}</span>
                                <span class="language-level">${lang.level}</span>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            ${data.hobbies && data.hobbies.length > 0 ? `
                <section class="section">
                    <h2 class="section-title">Hobbies</h2>
                    <div class="hobbies-grid">
                        ${data.hobbies.map(hobby => `
                            <span class="hobby-item">${hobby}</span>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            ${data.achievements && data.achievements.length > 0 ? `
                <section class="section">
                    <h2 class="section-title">Achievements</h2>
                    <ul class="achievements-list">
                        ${data.achievements.map(achievement => `
                            <li class="achievement-item">${achievement}</li>
                        `).join('')}
                    </ul>
                </section>
            ` : ''}
        </div>
    </body>
    </html>
  `,

  minimal: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Inter', -apple-system, sans-serif;
            }
            
            body {
                background: #fff;
                color: #2d3436;
                line-height: 1.6;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 60px 20px;
            }
            
            .header {
                text-align: center;
                margin-bottom: 60px;
            }
            
            .profile-photo {
                width: 120px;
                height: 120px;
                border-radius: 60px;
                object-fit: cover;
                margin-bottom: 20px;
            }
            
            .name {
                font-size: 36px;
                font-weight: 700;
                letter-spacing: -0.5px;
                margin-bottom: 15px;
            }
            
            .contact-info {
                color: #636e72;
                font-size: 16px;
            }
            
            .divider {
                width: 40px;
                height: 4px;
                background: #0984e3;
                margin: 40px auto;
            }
            
            .section {
                margin: 40px 0;
            }
            
            .section-title {
                font-size: 20px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #0984e3;
                margin-bottom: 25px;
            }
            
            .about {
                font-size: 18px;
                color: #2d3436;
                max-width: 600px;
                margin: 0 auto;
                text-align: center;
            }
            
            .experience-item {
                margin-bottom: 40px;
            }
            
            .experience-header {
                margin-bottom: 10px;
            }
            
            .company {
                font-size: 20px;
                font-weight: 600;
            }
            
            .date {
                color: #636e72;
                font-size: 14px;
            }
            
            .position {
                font-size: 16px;
                color: #0984e3;
                margin-bottom: 10px;
            }
            
            .skills-container, .hobbies-container {
                text-align: center;
            }
            
            .skill-item, .hobby-item {
                display: inline-block;
                margin: 5px;
                padding: 8px 16px;
                background: #f1f2f6;
                border-radius: 20px;
                font-size: 14px;
                color: #2d3436;
            }
            
            .achievements-list {
                max-width: 600px;
                margin: 0 auto;
                list-style: none;
            }
            
            .achievement-item {
                margin-bottom: 15px;
                padding-left: 20px;
                position: relative;
            }
            
            .achievement-item::before {
                content: '—';
                position: absolute;
                left: 0;
                color: #0984e3;
            }
            
            .language-item {
                text-align: center;
                margin-bottom: 15px;
            }
            
            .language-name {
                font-weight: 600;
                color: #2d3436;
            }
            
            .language-level {
                color: #0984e3;
                font-size: 14px;
                margin-left: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header class="header">
                ${data.personalInfo.photo ? `
                    <img src="${data.personalInfo.photo}" alt="Profile Photo" class="profile-photo">
                ` : ''}
                <h1 class="name">${data.personalInfo.name || ''}</h1>
                <div class="contact-info">
                    ${data.personalInfo.email ? `${data.personalInfo.email}` : ''}
                    ${data.personalInfo.email && data.personalInfo.phone ? ' • ' : ''}
                    ${data.personalInfo.phone ? `${data.personalInfo.phone}` : ''}
                </div>
            </header>

            ${data.personalInfo.about ? `
                <div class="divider"></div>
                <section class="section">
                    <div class="about">${data.personalInfo.about}</div>
                </section>
            ` : ''}

            ${data.experiences && data.experiences.length > 0 ? `
                <div class="divider"></div>
                <section class="section">
                    <h2 class="section-title">Experience</h2>
                    ${data.experiences.map(exp => `
                        <div class="experience-item">
                            <div class="experience-header">
                                <span class="company">${exp.company}</span>
                                <span class="date"> • ${exp.date}</span>
                            </div>
                            <div class="position">${exp.position}</div>
                            <div class="description">${exp.description}</div>
                        </div>
                    `).join('')}
                </section>
            ` : ''}

            ${data.skills && data.skills.length > 0 ? `
                <div class="divider"></div>
                <section class="section">
                    <h2 class="section-title">Skills</h2>
                    <div class="skills-container">
                        ${data.skills.map(skill => `
                            <span class="skill-item">${skill}</span>
                        `).join('')}
                    </div>
                </section>
            ` : ''}

            ${data.languages && data.languages.length > 0 ? `
                <div class="divider"></div>
                <section class="section">
                    <h2 class="section-title">Languages</h2>
                    ${data.languages.map(lang => `
                        <div class="language-item">
                            <span class="language-name">${lang.name}</span>
                            <span class="language-level">${lang.level}</span>
                        </div>
                    `).join('')}
                </section>
            ` : ''}

            ${data.hobbies && data.hobbies.length > 0 ? `
                <div class="divider"></div>
                <section class="section">
                    <h2 class="section-title">Hobbies</h2>
                    <div class="hobbies-container">
                        ${data.hobbies.map(hobby => `
                            <span class="hobby-item">${hobby}</span>
                        `).join('')}
                    </div>
                </section>
            ` : ''}
  
  ${data.achievements && data.achievements.length > 0 ? `
                <div class="divider"></div>
                <section class="section">
    <h2 class="section-title">Achievements</h2>
                    <ul class="achievements-list">
                        ${data.achievements.map(achievement => `
                            <li class="achievement-item">${achievement}</li>
                        `).join('')}
                    </ul>
                </section>
            ` : ''}
        </div>
    </body>
    </html>
  `,

  creative: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'SF Pro Display', -apple-system, sans-serif;
            }
            
            body {
                background: #ffffff;
                color: #2d3436;
                line-height: 1.6;
            }
            
            .container {
                display: grid;
                grid-template-columns: 300px 1fr;
                min-height: 100vh;
            }
            
            .sidebar {
                background: #6c5ce7;
                color: white;
                padding: 40px;
            }
            
            .profile-photo {
                width: 200px;
                height: 200px;
                border-radius: 20px;
                object-fit: cover;
                margin-bottom: 30px;
            }
            
            .name {
                font-size: 32px;
                font-weight: 700;
                margin-bottom: 15px;
            }
            
            .contact-info {
                margin-bottom: 40px;
            }
            
            .contact-item {
                margin-bottom: 10px;
                font-size: 14px;
                opacity: 0.9;
            }
            
            .main-content {
                padding: 60px;
            }
            
            .section {
                margin-bottom: 50px;
            }
            
            .section-title {
                font-size: 24px;
                font-weight: 700;
                color: #6c5ce7;
                margin-bottom: 25px;
                position: relative;
                padding-left: 20px;
            }
            
            .section-title::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 8px;
                height: 30px;
                background: #6c5ce7;
                border-radius: 4px;
            }
            
            .about {
                font-size: 16px;
                color: #2d3436;
                line-height: 1.8;
            }
            
            .experience-item {
                margin-bottom: 30px;
                padding: 25px;
                background: #f8f9fa;
                border-radius: 15px;
                position: relative;
                overflow: hidden;
            }
            
            .experience-item::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 4px;
                height: 100%;
                background: #6c5ce7;
            }
            
            .experience-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
            }
            
            .company {
                font-size: 20px;
                font-weight: 600;
                color: #2d3436;
            }
            
            .date {
                color: #6c5ce7;
                font-size: 14px;
                font-weight: 500;
            }
            
            .position {
                font-size: 16px;
                color: #6c5ce7;
                margin-bottom: 10px;
            }
            
            .sidebar-section {
                margin-bottom: 30px;
            }
            
            .sidebar-title {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 15px;
                opacity: 0.9;
            }
            
            .sidebar-skills, .sidebar-hobbies {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .sidebar-skill, .sidebar-hobby {
                background: rgba(255, 255, 255, 0.1);
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 14px;
            }
            
            .language-item {
                margin-bottom: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(255, 255, 255, 0.1);
                padding: 10px 15px;
                border-radius: 8px;
            }
            
            .language-name {
                font-weight: 500;
            }
            
            .language-level {
                font-size: 14px;
                opacity: 0.8;
            }
            
            .achievements-list {
                list-style: none;
            }
            
            .achievement-item {
                margin-bottom: 20px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
                position: relative;
                padding-left: 40px;
            }
            
            .achievement-item::before {
                content: '★';
                position: absolute;
                left: 15px;
                color: #6c5ce7;
            }
            
            @media (max-width: 768px) {
                .container {
                    grid-template-columns: 1fr;
                }
                
                .sidebar {
                    padding: 30px;
                    text-align: center;
                }
                
                .main-content {
                    padding: 30px;
                }
                
                .profile-photo {
                    width: 150px;
                    height: 150px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="sidebar">
                ${data.personalInfo.photo ? `
                    <img src="${data.personalInfo.photo}" alt="Profile Photo" class="profile-photo">
                ` : ''}
                <h1 class="name">${data.personalInfo.name || ''}</h1>
                <div class="contact-info">
                    ${data.personalInfo.email ? `
                        <div class="contact-item">${data.personalInfo.email}</div>
                    ` : ''}
                    ${data.personalInfo.phone ? `
                        <div class="contact-item">${data.personalInfo.phone}</div>
                    ` : ''}
                </div>

                ${data.skills && data.skills.length > 0 ? `
                    <div class="sidebar-section">
                        <h2 class="sidebar-title">Skills</h2>
                        <div class="sidebar-skills">
                            ${data.skills.map(skill => `
                                <div class="sidebar-skill">${skill}</div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${data.languages && data.languages.length > 0 ? `
                    <div class="sidebar-section">
                        <h2 class="sidebar-title">Languages</h2>
                        ${data.languages.map(lang => `
                            <div class="language-item">
                                <span class="language-name">${lang.name}</span>
                                <span class="language-level">${lang.level}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${data.hobbies && data.hobbies.length > 0 ? `
                    <div class="sidebar-section">
                        <h2 class="sidebar-title">Hobbies</h2>
                        <div class="sidebar-hobbies">
                            ${data.hobbies.map(hobby => `
                                <div class="sidebar-hobby">${hobby}</div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>

            <div class="main-content">
                ${data.personalInfo.about ? `
                    <section class="section">
                        <h2 class="section-title">About</h2>
                        <div class="about">${data.personalInfo.about}</div>
                    </section>
                ` : ''}

                ${data.experiences && data.experiences.length > 0 ? `
                    <section class="section">
                        <h2 class="section-title">Experience</h2>
                        ${data.experiences.map(exp => `
                            <div class="experience-item">
                                <div class="experience-header">
                                    <span class="company">${exp.company}</span>
                                    <span class="date">${exp.date}</span>
                                </div>
                                <div class="position">${exp.position}</div>
                                <div class="description">${exp.description}</div>
                            </div>
                        `).join('')}
                    </section>
                ` : ''}

                ${data.achievements && data.achievements.length > 0 ? `
                    <section class="section">
                        <h2 class="section-title">Achievements</h2>
                        <ul class="achievements-list">
                            ${data.achievements.map(achievement => `
                                <li class="achievement-item">${achievement}</li>
                            `).join('')}
                        </ul>
                    </section>
                ` : ''}
            </div>
        </div>
    </body>
    </html>
  `
};