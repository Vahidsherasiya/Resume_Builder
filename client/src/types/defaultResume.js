export const defaultResume = {
  id: 'resume-default-01',
  title: 'MERN Stack Developer Resume',
  lastModified: new Date().toISOString(),
  theme: {
    primaryColor: '#00c598', // Enhancv Teal
    secondaryColor: '#1e293b',
    accentColor: '#00c598',
    fontFamily: 'Inter',
    fontSize: 'medium',
    lineSpacing: 'normal',
    columnLayout: '55-45',
    borderStyle: 'solid'
  },
  header: {
    name: 'M VAHID SHERASIYA',
    title: 'B.Tech CSE Candidate',
    phone: '+91 9313409929',
    email: 'vahidsherasiya820@gmail.com',
    link: 'linkedin.com/in/m-vahid-sherasiya-3a5047380',
    extraLink: 'github.com/vahid-sherasiya',
    location: 'Gujarat, India',
    extraField: 'Portfolio: vahid.dev',
    dateOfBirth: '2004-05-15',
    nationality: 'Indian',
    avatarUrl: '',
    settings: {
      showTitle: true,
      showPhone: true,
      showLink: true,
      showExtraLink: false,
      showEmail: true,
      showLocation: false,
      isUppercaseName: true,
      showPhoto: false,
      showExtraField: false,
      showDateOfBirth: false,
      showNationality: false,
      photoStyle: 'circle'
    }
  },
  leftColumn: [
    {
      id: 'sec-summary',
      type: 'summary',
      title: 'SUMMARY',
      content: 'Aspiring Full Stack Developer with a B.Tech in Computer Science, proficient in building scalable web applications using the MERN stack and ASP.NET Core. Hands-on experience in developing e-commerce platforms and content management systems with a focus on RESTful APIs and responsive UI design. Eager to contribute technical skills to an innovative team and build high-performance digital solutions.',
      settings: {
        fontSize: 'normal',
        isBullet: false
      }
    },
    {
      id: 'sec-education',
      type: 'education',
      title: 'EDUCATION',
      settings: {
        showGpa: true,
        showInstitution: true,
        showLocation: false,
        showDatePeriod: true,
        showBullets: false,
        showLogo: false
      },
      items: [
        {
          id: 'edu-1',
          degree: 'B.Tech in Computer Science',
          institution: 'Darshan University',
          dateRange: '08/2022 - 05/2026',
          location: 'Rajkot, Gujarat',
          gpa: '4.0',
          gpaMax: '4.0',
          details: 'Focus on Data Structures, Web Technologies, Database Systems & Cloud Computing.'
        },
        {
          id: 'edu-2',
          degree: 'HSC (Higher Secondary)',
          institution: 'Modern School, Wankaner',
          dateRange: '05/2022 - 05/2022',
          location: 'Wankaner, Gujarat',
          gpa: '4.0',
          gpaMax: '4.0',
          details: 'Science Stream with Mathematics and Computer Studies.'
        },
        {
          id: 'edu-3',
          degree: 'SSC (Secondary School)',
          institution: 'Sanskruti Vidyalay School, Wankaner',
          dateRange: '05/2020 - 05/2020',
          location: 'Wankaner, Gujarat',
          gpa: '4.0',
          gpaMax: '4.0',
          details: 'Passed with Distinction.'
        }
      ]
    },
    {
      id: 'sec-certifications',
      type: 'certifications',
      title: 'CERTIFICATIONS',
      items: [
        {
          id: 'cert-1',
          title: 'Completed Course on Computer Concepts (CCC)',
          issuer: 'Govt. Recognized Certification',
          date: '2022'
        }
      ]
    },
    {
      id: 'sec-languages',
      type: 'languages',
      title: 'LANGUAGES',
      settings: {
        showProficiency: true,
        showSlider: true,
        sliderStyle: 'dots'
      },
      items: [
        {
          id: 'lang-1',
          language: 'Hindi',
          proficiency: 'Proficient',
          rating: 4
        },
        {
          id: 'lang-2',
          language: 'English',
          proficiency: 'Professional',
          rating: 4
        },
        {
          id: 'lang-3',
          language: 'Gujarati',
          proficiency: 'Native',
          rating: 5
        }
      ]
    }
  ],
  rightColumn: [
    {
      id: 'sec-strengths',
      type: 'strengths',
      title: 'STRENGTHS',
      settings: {
        showTitle: true,
        showDescription: true,
        showIcons: true
      },
      items: [
        {
          id: 'str-1',
          icon: 'heart',
          title: 'Soft Skills',
          description: 'Problem-solving, Technical Troubleshooting, Team Collaboration, Professional communication'
        }
      ]
    },
    {
      id: 'sec-skills',
      type: 'skills',
      title: 'SKILLS',
      settings: {
        showGroupName: false,
        layout: 'tags',
        borderStyle: 'solid'
      },
      groups: [
        {
          id: 'grp-1',
          name: 'Core Skills',
          skills: [
            'Gmail', 'GitHub', 'ASP.NET Core', 'ECommerce', 'REST', 'Java',
            'JavaScript', 'ES6+', 'Python', 'C#', 'C/C++', 'React', 'HTML',
            'Bootstrap', 'Node.js', 'Express.js', 'MongoDB', 'Microsoft SQL Server',
            'Git', 'Visual Studio Code', 'Netlify', 'CSS', 'Dataflow', 'SQL',
            'Entity Framework', 'CCC'
          ]
        }
      ]
    },
    {
      id: 'sec-interests',
      type: 'interests',
      title: 'INTERESTS',
      settings: {
        showDescription: true,
        showIcons: true
      },
      items: [
        {
          id: 'int-1',
          icon: 'lightbulb',
          title: 'Interests',
          description: 'Technology Reading, Music, Sports'
        }
      ]
    },
    {
      id: 'sec-projects',
      type: 'projects',
      title: 'PROJECTS',
      items: [
        {
          id: 'proj-1',
          name: 'Unique Ayurvedic',
          dateRange: '01/2025',
          subtitle: 'Full-Stack E-commerce Platform built using the MERN Stack',
          bullets: [
            'Developed a highly responsive UI using React.js and CSS for a seamless shopping experience',
            'Architected RESTful APIs with Node.js to handle complex data flow between the server and client',
            'Integrated a dedicated admin panel to manage product inventory, banners, and real-time order tracking'
          ]
        }
      ]
    }
  ]
};
