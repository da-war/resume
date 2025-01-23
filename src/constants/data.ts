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