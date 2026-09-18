export const RESUME_TEMPLATES = [
  {
    id: 'template-modern-enhancv',
    name: 'Modern Enhancv',
    category: 'Modern',
    badge: 'Popular',
    description: 'Clean dual-column layout with vibrant teal accents, tags, and progress meters.',
    theme: {
      templateStyle: 'modern-enhancv',
      primaryColor: '#00c598',
      secondaryColor: '#1e293b',
      accentColor: '#00c598',
      fontFamily: 'Inter, sans-serif',
      fontSize: 'medium',
      lineSpacing: 'normal',
      columnLayout: '55-45',
      borderStyle: 'solid'
    },
    sampleData: {
      id: 'resume-demo-enhancv',
      title: 'Full Stack Engineer Resume',
      lastModified: new Date().toISOString(),
      theme: {
        templateStyle: 'modern-enhancv',
        primaryColor: '#00c598',
        secondaryColor: '#1e293b',
        accentColor: '#00c598',
        fontFamily: 'Inter, sans-serif',
        fontSize: 'medium',
        lineSpacing: 'normal',
        columnLayout: '55-45',
        borderStyle: 'solid'
      },
      header: {
        name: 'ALEX MORGAN',
        title: 'Senior Full-Stack Engineer',
        phone: '+1 (555) 382-9910',
        email: 'alex.morgan.dev@example.com',
        link: 'linkedin.com/in/alexmorgan-tech',
        extraLink: 'github.com/alexm-dev',
        location: 'San Francisco, CA',
        extraField: 'Portfolio: alexmorgan.dev',
        dateOfBirth: '',
        nationality: '',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        settings: {
          showTitle: true,
          showPhone: true,
          showLink: true,
          showExtraLink: true,
          showEmail: true,
          showLocation: true,
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
          id: 'sec-sum-1',
          type: 'summary',
          title: 'SUMMARY',
          content: 'Performance-driven Full-Stack Engineer with 6+ years of expertise in architecting high-throughput distributed systems, modern React ecosystems, and Node.js microservices. Proven track record of optimizing web latency by 42% and scaling SaaS applications to 500k+ active users.',
          settings: { fontSize: 'normal', isBullet: false }
        },
        {
          id: 'sec-exp-1',
          type: 'experience',
          title: 'EXPERIENCE',
          items: [
            {
              id: 'exp-1',
              role: 'Senior Full Stack Engineer',
              company: 'Stripeflow Technologies',
              dateRange: '03/2022 - Present',
              bullets: [
                'Architected event-driven microservices using Node.js, Kafka, and Redis reducing API response times by 38%.',
                'Led frontend migration to React 18 and Next.js, elevating Google Lighthouse performance score from 64 to 98.',
                'Mentored 6 junior engineers and instituted comprehensive automated CI/CD pipelines with 94% test coverage.'
              ]
            },
            {
              id: 'exp-2',
              role: 'Full Stack Developer',
              company: 'Apex Digital Labs',
              dateRange: '06/2019 - 02/2022',
              bullets: [
                'Developed scalable multi-tenant SaaS dashboard handling 10M+ monthly analytical events.',
                'Designed secure OAuth2 and JWT authentication protocols for enterprise SSO clients.'
              ]
            }
          ]
        },
        {
          id: 'sec-edu-1',
          type: 'education',
          title: 'EDUCATION',
          settings: {
            showGpa: true,
            showInstitution: true,
            showLocation: true,
            showDatePeriod: true,
            showBullets: false,
            showLogo: false
          },
          items: [
            {
              id: 'edu-1',
              degree: 'B.S. in Computer Science',
              institution: 'University of California, Berkeley',
              dateRange: '2015 - 2019',
              location: 'Berkeley, CA',
              gpa: '3.9',
              gpaMax: '4.0',
              details: 'Dean’s Honor List. Specialization in Distributed Computing & Software Architecture.'
            }
          ]
        }
      ],
      rightColumn: [
        {
          id: 'sec-skills-1',
          type: 'skills',
          title: 'CORE SKILLS',
          settings: { showGroupName: false, layout: 'tags', borderStyle: 'solid' },
          groups: [
            {
              id: 'grp-1',
              name: 'Technical',
              skills: [
                'TypeScript', 'React.js', 'Node.js', 'Next.js', 'PostgreSQL',
                'MongoDB', 'Docker', 'Kubernetes', 'AWS', 'GraphQL', 'Redis',
                'TailwindCSS', 'Jest', 'Git', 'Microservices', 'REST APIs'
              ]
            }
          ]
        },
        {
          id: 'sec-proj-1',
          type: 'projects',
          title: 'KEY PROJECTS',
          items: [
            {
              id: 'proj-1',
              name: 'CloudSync - Realtime Collab Engine',
              dateRange: '2024',
              subtitle: 'Open-source distributed CRDT editor',
              bullets: [
                'Implemented WebSockets and operational transforms supporting 100+ concurrent editors with <15ms latency.',
                'Gained 2,400+ GitHub stars and featured on Hacker News frontpage.'
              ]
            }
          ]
        },
        {
          id: 'sec-cert-1',
          type: 'certifications',
          title: 'CERTIFICATIONS',
          items: [
            {
              id: 'cert-1',
              title: 'AWS Certified Solutions Architect – Associate',
              issuer: 'Amazon Web Services',
              date: '2023'
            }
          ]
        },
        {
          id: 'sec-lang-1',
          type: 'languages',
          title: 'LANGUAGES',
          settings: { showProficiency: true, showSlider: true, sliderStyle: 'dots' },
          items: [
            { id: 'lang-1', language: 'English', proficiency: 'Native', rating: 5 },
            { id: 'lang-2', language: 'Spanish', proficiency: 'Conversational', rating: 3 }
          ]
        }
      ]
    }
  },

  {
    id: 'template-silicon-minimal',
    name: 'Silicon Valley Tech Minimalist',
    category: 'Tech & Single-Col',
    badge: 'Clean & ATS',
    description: 'High density monochrome single-column tech resume tailored for FAANG & tier-1 startups.',
    theme: {
      templateStyle: 'tech-minimal',
      primaryColor: '#0f172a',
      secondaryColor: '#334155',
      accentColor: '#2563eb',
      fontFamily: 'Roboto, sans-serif',
      fontSize: 'medium',
      lineSpacing: 'tight',
      columnLayout: 'single',
      borderStyle: 'solid'
    },
    sampleData: {
      id: 'resume-demo-silicon',
      title: 'Senior DevOps Architect Resume',
      lastModified: new Date().toISOString(),
      theme: {
        templateStyle: 'tech-minimal',
        primaryColor: '#0f172a',
        secondaryColor: '#334155',
        accentColor: '#2563eb',
        fontFamily: 'Roboto, sans-serif',
        fontSize: 'medium',
        lineSpacing: 'tight',
        columnLayout: 'single',
        borderStyle: 'solid'
      },
      header: {
        name: 'MARCUS CHEN',
        title: 'Staff Cloud & DevOps Architect',
        phone: '+1 (415) 890-2341',
        email: 'marcus.chen.cloud@example.com',
        link: 'linkedin.com/in/marcuschen-devops',
        extraLink: 'github.com/mchen-infra',
        location: 'Seattle, WA',
        extraField: '',
        dateOfBirth: '',
        nationality: '',
        avatarUrl: '',
        settings: {
          showTitle: true,
          showPhone: true,
          showLink: true,
          showExtraLink: true,
          showEmail: true,
          showLocation: true,
          isUppercaseName: true,
          showPhoto: false,
          showExtraField: false,
          showDateOfBirth: false,
          showNationality: false
        }
      },
      leftColumn: [
        {
          id: 'sec-sum-2',
          type: 'summary',
          title: 'PROFESSIONAL SUMMARY',
          content: 'Staff Cloud Infrastructure Architect with 8+ years designing enterprise Kubernetes platforms, multi-region AWS/GCP deployments, and GitOps workflows. Reduced annual infrastructure cloud spend by $1.2M while guaranteeing 99.995% uptime for tier-1 payment gateways.',
          settings: { fontSize: 'normal', isBullet: false }
        },
        {
          id: 'sec-exp-2',
          type: 'experience',
          title: 'PROFESSIONAL EXPERIENCE',
          items: [
            {
              id: 'exp-s1',
              role: 'Staff DevOps Engineer',
              company: 'CloudMatrix Networks',
              dateRange: '08/2021 - Present',
              bullets: [
                'Spearheaded global migration of 200+ microservices to Amazon EKS using Terraform and ArgoCD.',
                'Built automated zero-trust observability pipeline using Prometheus, Grafana, and OpenTelemetry.',
                'Decreased deployment cycle times from 4 hours to 12 minutes via ephemeral containerized staging environments.'
              ]
            },
            {
              id: 'exp-s2',
              role: 'Senior Site Reliability Engineer',
              company: 'Vanguard Systems',
              dateRange: '02/2018 - 07/2021',
              bullets: [
                'Automated multi-region disaster recovery failovers with RPO < 1 min and RTO < 5 mins.',
                'Designed chaos engineering simulations reducing unexpected production outages by 75%.'
              ]
            }
          ]
        },
        {
          id: 'sec-skills-2',
          type: 'skills',
          title: 'TECHNICAL SKILLS',
          settings: { showGroupName: false, layout: 'tags', borderStyle: 'solid' },
          groups: [
            {
              id: 'grp-sv1',
              name: 'Core Tech',
              skills: ['Kubernetes', 'Terraform', 'AWS', 'GCP', 'Docker', 'ArgoCD', 'Prometheus', 'Helm', 'Golang', 'Python', 'CI/CD', 'Kafka', 'Linux Kernel', 'Ansible']
            }
          ]
        },
        {
          id: 'sec-edu-2',
          type: 'education',
          title: 'EDUCATION & CERTIFICATIONS',
          settings: { showGpa: false, showInstitution: true, showLocation: true, showDatePeriod: true },
          items: [
            {
              id: 'edu-sv1',
              degree: 'B.S. in Computer Engineering',
              institution: 'University of Washington',
              dateRange: '2014 - 2018',
              location: 'Seattle, WA',
              details: 'Certified Kubernetes Administrator (CKA) & AWS Certified DevOps Engineer Professional.'
            }
          ]
        }
      ],
      rightColumn: []
    }
  },

  {
    id: 'template-executive-harvard',
    name: 'Harvard Executive Classic',
    category: 'Executive',
    badge: 'Timeless',
    description: 'Sophisticated serif typography, deep navy divider accents, designed for leadership & management.',
    theme: {
      templateStyle: 'executive-classic',
      primaryColor: '#1e3a8a',
      secondaryColor: '#0f172a',
      accentColor: '#b45309',
      fontFamily: 'Merriweather, serif',
      fontSize: 'medium',
      lineSpacing: 'normal',
      columnLayout: 'single',
      borderStyle: 'solid'
    },
    sampleData: {
      id: 'resume-demo-harvard',
      title: 'Executive Leadership Resume',
      lastModified: new Date().toISOString(),
      theme: {
        templateStyle: 'executive-classic',
        primaryColor: '#1e3a8a',
        secondaryColor: '#0f172a',
        accentColor: '#b45309',
        fontFamily: 'Merriweather, serif',
        fontSize: 'medium',
        lineSpacing: 'normal',
        columnLayout: 'single',
        borderStyle: 'solid'
      },
      header: {
        name: 'ELEANOR VANCE, MBA',
        title: 'Chief Operating Officer & Strategic Growth Leader',
        phone: '+1 (212) 478-9021',
        email: 'eleanor.vance@exec-advisors.com',
        link: 'linkedin.com/in/eleanor-vance-exec',
        extraLink: '',
        location: 'New York, NY',
        extraField: '',
        dateOfBirth: '',
        nationality: '',
        avatarUrl: '',
        settings: {
          showTitle: true,
          showPhone: true,
          showLink: true,
          showExtraLink: false,
          showEmail: true,
          showLocation: true,
          isUppercaseName: true,
          showPhoto: false
        }
      },
      leftColumn: [
        {
          id: 'sec-exec-sum',
          type: 'summary',
          title: 'EXECUTIVE PROFILE',
          content: 'Visionary Operations Executive with 14+ years steering enterprise digital transformations, P&L management ($80M+), and global operational scaling across North America and EMEA. Adept at post-merger integration, EBITDA expansion, and cultivating high-performance executive cultures.',
          settings: { fontSize: 'normal', isBullet: false }
        },
        {
          id: 'sec-exec-exp',
          type: 'experience',
          title: 'EXECUTIVE EXPERIENCE',
          items: [
            {
              id: 'exp-e1',
              role: 'Chief Operating Officer',
              company: 'Aether Global Logistics Corp.',
              dateRange: '2020 - Present',
              bullets: [
                'Expanded operating margin by 340 bps while scaling international workforce from 420 to 1,200 employees.',
                'Led end-to-end supply chain digitization resulting in $14.5M annual cost synergies.'
              ]
            },
            {
              id: 'exp-e2',
              role: 'Vice President of Global Operations',
              company: 'Sterling Capital Holdings',
              dateRange: '2015 - 2020',
              bullets: [
                'Managed $65M operational budget, driving 28% YoY top-line revenue acceleration.',
                'Spearheaded successful integration of two strategic acquisitions valued at $45M.'
              ]
            }
          ]
        },
        {
          id: 'sec-exec-edu',
          type: 'education',
          title: 'EDUCATION & GOVERNANCE',
          settings: { showGpa: false, showInstitution: true, showLocation: true, showDatePeriod: true },
          items: [
            {
              id: 'edu-e1',
              degree: 'Master of Business Administration (MBA)',
              institution: 'Harvard Business School',
              dateRange: '2013 - 2015',
              location: 'Boston, MA',
              details: 'Concentration in General Management & Strategy. Harvard Leadership Fellow.'
            },
            {
              id: 'edu-e2',
              degree: 'B.A. in Economics & International Relations',
              institution: 'Columbia University',
              dateRange: '2008 - 2012',
              location: 'New York, NY',
              details: 'Magna Cum Laude.'
            }
          ]
        }
      ],
      rightColumn: []
    }
  },

  {
    id: 'template-creative-sidebar',
    name: 'Creative Sidebar (Indigo Designer)',
    category: 'Creative',
    badge: 'Stylish',
    description: 'Distinctive colored sidebar featuring photo, bio, skills, and languages with crisp right body.',
    theme: {
      templateStyle: 'sidebar-indigo',
      primaryColor: '#4f46e5',
      secondaryColor: '#1e1b4b',
      accentColor: '#4f46e5',
      fontFamily: 'Outfit, sans-serif',
      fontSize: 'medium',
      lineSpacing: 'normal',
      columnLayout: '40-60',
      borderStyle: 'solid'
    },
    sampleData: {
      id: 'resume-demo-indigo',
      title: 'Lead Product Designer Resume',
      lastModified: new Date().toISOString(),
      theme: {
        templateStyle: 'sidebar-indigo',
        primaryColor: '#4f46e5',
        secondaryColor: '#1e1b4b',
        accentColor: '#4f46e5',
        fontFamily: 'Outfit, sans-serif',
        fontSize: 'medium',
        lineSpacing: 'normal',
        columnLayout: '40-60',
        borderStyle: 'solid'
      },
      header: {
        name: 'SOPHIA MARTINEZ',
        title: 'Lead UI/UX & Product Designer',
        phone: '+1 (310) 902-8812',
        email: 'sophia.martinez.design@example.com',
        link: 'behance.net/sophiam-design',
        extraLink: 'dribbble.com/sophiadesign',
        location: 'Los Angeles, CA',
        extraField: 'portfolio: sophiadesign.io',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        settings: {
          showTitle: true,
          showPhone: true,
          showLink: true,
          showExtraLink: true,
          showEmail: true,
          showLocation: true,
          isUppercaseName: true,
          showPhoto: true,
          photoStyle: 'circle'
        }
      },
      leftColumn: [
        {
          id: 'sec-side-skills',
          type: 'skills',
          title: 'DESIGN TOOLKIT',
          settings: { showGroupName: false, layout: 'tags', borderStyle: 'solid' },
          groups: [
            {
              id: 'grp-des',
              name: 'Design',
              skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Wireframing', 'Framer', 'UI Interaction', 'Usability Testing', 'HTML/CSS', 'Storybook']
            }
          ]
        },
        {
          id: 'sec-side-lang',
          type: 'languages',
          title: 'LANGUAGES',
          settings: { showProficiency: true, showSlider: true, sliderStyle: 'dots' },
          items: [
            { id: 'l1', language: 'English', proficiency: 'Fluent', rating: 5 },
            { id: 'l2', language: 'French', proficiency: 'Intermediate', rating: 3 }
          ]
        },
        {
          id: 'sec-side-edu',
          type: 'education',
          title: 'EDUCATION',
          settings: { showGpa: false, showInstitution: true, showLocation: false, showDatePeriod: true },
          items: [
            {
              id: 'edu-des1',
              degree: 'B.F.A. in Interaction Design',
              institution: 'Rhode Island School of Design (RISD)',
              dateRange: '2016 - 2020',
              location: 'Providence, RI'
            }
          ]
        }
      ],
      rightColumn: [
        {
          id: 'sec-side-sum',
          type: 'summary',
          title: 'ABOUT ME',
          content: 'Award-winning Product Designer with 5+ years crafting intuitive mobile and web user experiences. Passionate about human-centered design, accessible component design systems, and driving product conversions through data-informed UX.',
          settings: { fontSize: 'normal', isBullet: false }
        },
        {
          id: 'sec-side-exp',
          type: 'experience',
          title: 'WORK EXPERIENCE',
          items: [
            {
              id: 'exp-d1',
              role: 'Lead Product Designer',
              company: 'Fintech Studio Labs',
              dateRange: '2022 - Present',
              bullets: [
                'Spearheaded redesign of mobile banking app, boosting customer onboarding conversion by 28%.',
                'Built unified cross-platform Design System adopted by 40+ designers and 120+ engineers.'
              ]
            },
            {
              id: 'exp-d2',
              role: 'Senior UI/UX Designer',
              company: 'PixelWave Creative',
              dateRange: '2020 - 2022',
              bullets: [
                'Led user testing sessions and delivered end-to-end interactive prototypes for Fortune 500 clients.'
              ]
            }
          ]
        },
        {
          id: 'sec-side-proj',
          type: 'projects',
          title: 'FEATURED PROJECTS',
          items: [
            {
              id: 'proj-d1',
              name: 'Kroma Design System',
              dateRange: '2023',
              subtitle: 'Comprehensive multi-brand UI kit',
              bullets: ['500+ Figma components with tokenized variables and automated Figma-to-Code sync.']
            }
          ]
        }
      ]
    }
  },

  {
    id: 'template-compact-ats',
    name: 'Compact ATS Pro',
    category: 'ATS Optimized',
    badge: 'High Score',
    description: 'Condensed 1-page format engineered to parse flawlessly through applicant tracking systems.',
    theme: {
      templateStyle: 'compact-ats',
      primaryColor: '#0f766e',
      secondaryColor: '#0f172a',
      accentColor: '#0f766e',
      fontFamily: 'Inter, sans-serif',
      fontSize: 'small',
      lineSpacing: 'tight',
      columnLayout: 'single',
      borderStyle: 'solid'
    },
    sampleData: {
      id: 'resume-demo-ats',
      title: 'ATS Optimized Software Engineer Resume',
      lastModified: new Date().toISOString(),
      theme: {
        templateStyle: 'compact-ats',
        primaryColor: '#0f766e',
        secondaryColor: '#0f172a',
        accentColor: '#0f766e',
        fontFamily: 'Inter, sans-serif',
        fontSize: 'small',
        lineSpacing: 'tight',
        columnLayout: 'single',
        borderStyle: 'solid'
      },
      header: {
        name: 'DAVID K. MILLER',
        title: 'Lead Software Engineer',
        phone: '(555) 723-8890',
        email: 'david.miller.dev@email.com',
        link: 'linkedin.com/in/david-miller-engineer',
        extraLink: 'github.com/dmiller-code',
        location: 'Austin, TX',
        extraField: '',
        settings: {
          showTitle: true,
          showPhone: true,
          showLink: true,
          showExtraLink: true,
          showEmail: true,
          showLocation: true,
          isUppercaseName: true,
          showPhoto: false
        }
      },
      leftColumn: [
        {
          id: 'sec-ats-sum',
          type: 'summary',
          title: 'SUMMARY OF QUALIFICATIONS',
          content: 'Results-driven Lead Software Engineer with 7+ years building enterprise web applications, GraphQL microservices, and database pipelines using React, TypeScript, Node.js, and SQL. Expert in cloud optimization and automated testing.',
          settings: { fontSize: 'normal', isBullet: false }
        },
        {
          id: 'sec-ats-exp',
          type: 'experience',
          title: 'PROFESSIONAL EXPERIENCE',
          items: [
            {
              id: 'exp-ats-1',
              role: 'Lead Software Engineer',
              company: 'NextGen Solutions Inc.',
              dateRange: '04/2021 - Present',
              bullets: [
                'Designed and shipped high-performance real-time analytics backend handling 80,000 requests/sec.',
                'Refactored legacy monolith into 12 microservices, reducing cloud computing overhead by 31% ($240k/yr).',
                'Championed test-driven development (TDD), boosting code coverage to 92% across all repositories.'
              ]
            },
            {
              id: 'exp-ats-2',
              role: 'Software Developer',
              company: 'Apex Software Partners',
              dateRange: '08/2018 - 03/2021',
              bullets: [
                'Engineered responsive React portals integrated with RESTful endpoints and Stripe payments.',
                'Optimized SQL database indexes and queries, speeding up dashboard report generation by 65%.'
              ]
            }
          ]
        },
        {
          id: 'sec-ats-skills',
          type: 'skills',
          title: 'TECHNICAL SKILLS',
          settings: { showGroupName: false, layout: 'tags', borderStyle: 'solid' },
          groups: [
            {
              id: 'grp-ats',
              name: 'Skills',
              skills: ['JavaScript / TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'AWS (EC2, S3, RDS)', 'Git', 'CI/CD Pipelines', 'REST APIs', 'GraphQL', 'Jest']
            }
          ]
        },
        {
          id: 'sec-ats-edu',
          type: 'education',
          title: 'EDUCATION',
          settings: { showGpa: true, showInstitution: true, showLocation: true, showDatePeriod: true },
          items: [
            {
              id: 'edu-ats-1',
              degree: 'Bachelor of Science in Computer Science',
              institution: 'University of Texas at Austin',
              dateRange: '2014 - 2018',
              location: 'Austin, TX',
              gpa: '3.85',
              gpaMax: '4.0'
            }
          ]
        }
      ],
      rightColumn: []
    }
  },

  {
    id: 'template-nordic-clean',
    name: 'Nordic Clean (Modern Minimalist)',
    category: 'Modern',
    badge: 'Elegant',
    description: 'Airy layout with subtle grey badge accents and soft contemporary aesthetics.',
    theme: {
      templateStyle: 'nordic-clean',
      primaryColor: '#334155',
      secondaryColor: '#64748b',
      accentColor: '#0ea5e9',
      fontFamily: 'Outfit, sans-serif',
      fontSize: 'medium',
      lineSpacing: 'loose',
      columnLayout: '60-40',
      borderStyle: 'solid'
    },
    sampleData: {
      id: 'resume-demo-nordic',
      title: 'Growth Marketing Lead Resume',
      lastModified: new Date().toISOString(),
      theme: {
        templateStyle: 'nordic-clean',
        primaryColor: '#334155',
        secondaryColor: '#64748b',
        accentColor: '#0ea5e9',
        fontFamily: 'Outfit, sans-serif',
        fontSize: 'medium',
        lineSpacing: 'loose',
        columnLayout: '60-40',
        borderStyle: 'solid'
      },
      header: {
        name: 'ASTRID LINDHOLM',
        title: 'Head of Growth & Digital Marketing',
        phone: '+46 8 123 4567',
        email: 'astrid.lindholm.growth@example.com',
        link: 'linkedin.com/in/astrid-lindholm',
        extraLink: '',
        location: 'Stockholm, Sweden',
        extraField: '',
        avatarUrl: '',
        settings: {
          showTitle: true,
          showPhone: true,
          showLink: true,
          showExtraLink: false,
          showEmail: true,
          showLocation: true,
          isUppercaseName: true,
          showPhoto: false
        }
      },
      leftColumn: [
        {
          id: 'sec-nord-sum',
          type: 'summary',
          title: 'PROFILE',
          content: 'Data-driven Growth Lead with 6+ years driving B2B SaaS ARR acquisition, funnel conversion rate optimization, and performance marketing across European and US markets. Scaled monthly organic traffic from 50k to 650k visitors.',
          settings: { fontSize: 'normal', isBullet: false }
        },
        {
          id: 'sec-nord-exp',
          type: 'experience',
          title: 'EXPERIENCE',
          items: [
            {
              id: 'exp-n1',
              role: 'Head of Growth',
              company: 'Nordic Cloud Technologies',
              dateRange: '2021 - Present',
              bullets: [
                'Grew Annual Recurring Revenue (ARR) by 145% through full-funnel paid and organic acquisition.',
                'Lowered Customer Acquisition Cost (CAC) by 32% via automated landing page personalization.'
              ]
            },
            {
              id: 'exp-n2',
              role: 'Growth Marketing Manager',
              company: 'Verve Mobile Apps',
              dateRange: '2019 - 2021',
              bullets: [
                'Managed $1.8M annual ad spend across Google, Meta, and LinkedIn with 4.2x ROAS.'
              ]
            }
          ]
        },
        {
          id: 'sec-nord-edu',
          type: 'education',
          title: 'EDUCATION',
          settings: { showGpa: false, showInstitution: true, showLocation: true, showDatePeriod: true },
          items: [
            {
              id: 'edu-n1',
              degree: 'M.Sc. in Strategic Marketing',
              institution: 'Stockholm School of Economics',
              dateRange: '2017 - 2019',
              location: 'Stockholm, Sweden'
            }
          ]
        }
      ],
      rightColumn: [
        {
          id: 'sec-nord-skills',
          type: 'skills',
          title: 'EXPERTISE',
          settings: { showGroupName: false, layout: 'tags', borderStyle: 'solid' },
          groups: [
            {
              id: 'grp-n1',
              name: 'Skills',
              skills: ['Growth Strategy', 'SEO & SEM', 'Google Analytics 4', 'A/B Testing', 'HubSpot', 'Mixpanel', 'Paid Acquisition', 'Lifecycle Marketing', 'SQL']
            }
          ]
        },
        {
          id: 'sec-nord-strengths',
          type: 'strengths',
          title: 'KEY STRENGTHS',
          settings: { showTitle: true, showDescription: true, showIcons: true },
          items: [
            {
              id: 'str-n1',
              icon: 'heart',
              title: 'Funnel Optimization',
              description: 'Systematic testing of activation and retention metrics.'
            }
          ]
        },
        {
          id: 'sec-nord-lang',
          type: 'languages',
          title: 'LANGUAGES',
          settings: { showProficiency: true, showSlider: true, sliderStyle: 'dots' },
          items: [
            { id: 'ln-1', language: 'Swedish', proficiency: 'Native', rating: 5 },
            { id: 'ln-2', language: 'English', proficiency: 'Bilingual', rating: 5 },
            { id: 'ln-3', language: 'German', proficiency: 'Working', rating: 3 }
          ]
        }
      ]
    }
  },

  {
    id: 'template-emerald-duo',
    name: 'Emerald Duo (AI & Data Science)',
    category: 'Creative',
    badge: 'High Impact',
    description: 'Rich emerald header and structured split cards suited for Data Science & AI researchers.',
    theme: {
      templateStyle: 'emerald-duo',
      primaryColor: '#059669',
      secondaryColor: '#064e3b',
      accentColor: '#10b981',
      fontFamily: 'Poppins, sans-serif',
      fontSize: 'medium',
      lineSpacing: 'normal',
      columnLayout: '50-50',
      borderStyle: 'solid'
    },
    sampleData: {
      id: 'resume-demo-emerald',
      title: 'AI & Machine Learning Engineer Resume',
      lastModified: new Date().toISOString(),
      theme: {
        templateStyle: 'emerald-duo',
        primaryColor: '#059669',
        secondaryColor: '#064e3b',
        accentColor: '#10b981',
        fontFamily: 'Poppins, sans-serif',
        fontSize: 'medium',
        lineSpacing: 'normal',
        columnLayout: '50-50',
        borderStyle: 'solid'
      },
      header: {
        name: 'DR. ARIS THORNE',
        title: 'Principal AI & Machine Learning Scientist',
        phone: '+1 (617) 945-0012',
        email: 'aris.thorne.ai@example.com',
        link: 'scholar.google.com/citations?aris',
        extraLink: 'github.com/aris-thorne-ai',
        location: 'Boston, MA',
        settings: {
          showTitle: true,
          showPhone: true,
          showLink: true,
          showExtraLink: true,
          showEmail: true,
          showLocation: true,
          isUppercaseName: true,
          showPhoto: false
        }
      },
      leftColumn: [
        {
          id: 'sec-em-sum',
          type: 'summary',
          title: 'RESEARCH & IMPACT',
          content: 'Applied AI Researcher and Engineer with 7+ years pioneering Large Language Model (LLM) fine-tuning, retrieval-augmented generation (RAG), and computer vision pipelines. Author of 8 IEEE/NeurIPS papers with 1,400+ citations.',
          settings: { fontSize: 'normal', isBullet: false }
        },
        {
          id: 'sec-em-exp',
          type: 'experience',
          title: 'INDUSTRY EXPERIENCE',
          items: [
            {
              id: 'exp-em1',
              role: 'Principal ML Scientist',
              company: 'Synthetix AI Labs',
              dateRange: '2022 - Present',
              bullets: [
                'Trained and deployed domain-specific 70B parameter LLM models with 4-bit quantization.',
                'Built low-latency RAG vector search engine querying 50M+ financial filings in <45ms.'
              ]
            },
            {
              id: 'exp-em2',
              role: 'Machine Learning Engineer',
              company: 'Visionary Robotics Corp',
              dateRange: '2019 - 2022',
              bullets: [
                'Optimized real-time YOLO object detection models running on edge NVIDIA Jetson hardware.'
              ]
            }
          ]
        },
        {
          id: 'sec-em-edu',
          type: 'education',
          title: 'EDUCATION',
          settings: { showGpa: true, showInstitution: true, showLocation: true, showDatePeriod: true },
          items: [
            {
              id: 'edu-em1',
              degree: 'Ph.D. in Computer Science (Machine Learning)',
              institution: 'Massachusetts Institute of Technology (MIT)',
              dateRange: '2015 - 2019',
              location: 'Cambridge, MA',
              gpa: '4.0',
              gpaMax: '4.0'
            }
          ]
        }
      ],
      rightColumn: [
        {
          id: 'sec-em-skills',
          type: 'skills',
          title: 'AI & DATA SKILLS',
          settings: { showGroupName: false, layout: 'tags', borderStyle: 'solid' },
          groups: [
            {
              id: 'grp-em',
              name: 'Skills',
              skills: ['PyTorch', 'TensorFlow', 'HuggingFace', 'LLMs & RAG', 'LangChain', 'Python', 'C++', 'CUDA', 'Vector DBs (Pinecone)', 'MLOps', 'Kubeflow', 'Docker']
            }
          ]
        },
        {
          id: 'sec-em-proj',
          type: 'projects',
          title: 'OPEN SOURCE CONTRIBUTIONS',
          items: [
            {
              id: 'proj-em1',
              name: 'FastRAG-Engine',
              dateRange: '2024',
              subtitle: 'High-speed hybrid semantic search toolkit',
              bullets: ['Adopted by 35+ enterprises and starred over 4,200 times on GitHub.']
            }
          ]
        },
        {
          id: 'sec-em-cert',
          type: 'certifications',
          title: 'HONORS & AWARDS',
          items: [
            {
              id: 'cert-em1',
              title: 'Best Paper Award – Computer Vision Conference',
              issuer: 'IEEE CVPR',
              date: '2021'
            }
          ]
        }
      ]
    }
  },

  {
    id: 'template-dark-banner',
    name: 'Dark Banner Tech Pro',
    category: 'Modern',
    badge: 'Pro Dark',
    description: 'Striking dark header banner with crisp white body cards for high visual contrast.',
    theme: {
      templateStyle: 'dark-banner',
      primaryColor: '#0f172a',
      secondaryColor: '#38bdf8',
      accentColor: '#38bdf8',
      fontFamily: 'Inter, sans-serif',
      fontSize: 'medium',
      lineSpacing: 'normal',
      columnLayout: '55-45',
      borderStyle: 'solid'
    },
    sampleData: {
      id: 'resume-demo-darkbanner',
      title: 'Frontend Architect Resume',
      lastModified: new Date().toISOString(),
      theme: {
        templateStyle: 'dark-banner',
        primaryColor: '#0f172a',
        secondaryColor: '#38bdf8',
        accentColor: '#38bdf8',
        fontFamily: 'Inter, sans-serif',
        fontSize: 'medium',
        lineSpacing: 'normal',
        columnLayout: '55-45',
        borderStyle: 'solid'
      },
      header: {
        name: 'JORDAN LEE',
        title: 'Principal Frontend Architect',
        phone: '+1 (415) 304-9988',
        email: 'jordan.lee.architect@example.com',
        link: 'linkedin.com/in/jordanlee-front',
        extraLink: 'github.com/jordanlee-dev',
        location: 'San Jose, CA',
        settings: {
          showTitle: true,
          showPhone: true,
          showLink: true,
          showExtraLink: true,
          showEmail: true,
          showLocation: true,
          isUppercaseName: true,
          showPhoto: false
        }
      },
      leftColumn: [
        {
          id: 'sec-db-sum',
          type: 'summary',
          title: 'SUMMARY',
          content: 'Frontend Architect with 8+ years leading design system engineering, micro-frontends, and performance optimization for web applications used by 20M+ users. Expert in React, TypeScript, WebAssembly, and state management.',
          settings: { fontSize: 'normal', isBullet: false }
        },
        {
          id: 'sec-db-exp',
          type: 'experience',
          title: 'EXPERIENCE',
          items: [
            {
              id: 'exp-db1',
              role: 'Principal Frontend Architect',
              company: 'Veloce Platforms',
              dateRange: '2021 - Present',
              bullets: [
                'Standardized company-wide micro-frontend architecture using Webpack Module Federation.',
                'Cut web bundle size by 54% and elevated First Contentful Paint (FCP) from 2.8s to 0.7s.'
              ]
            },
            {
              id: 'exp-db2',
              role: 'Senior React Developer',
              company: 'Horizon Cloud SaaS',
              dateRange: '2018 - 2021',
              bullets: [
                'Authored internal design system with 80+ accessible components in React and TypeScript.'
              ]
            }
          ]
        },
        {
          id: 'sec-db-edu',
          type: 'education',
          title: 'EDUCATION',
          settings: { showGpa: true, showInstitution: true, showLocation: true, showDatePeriod: true },
          items: [
            {
              id: 'edu-db1',
              degree: 'B.S. in Software Engineering',
              institution: 'San Jose State University',
              dateRange: '2014 - 2018',
              location: 'San Jose, CA',
              gpa: '3.9'
            }
          ]
        }
      ],
      rightColumn: [
        {
          id: 'sec-db-skills',
          type: 'skills',
          title: 'TECH STACK',
          settings: { showGroupName: false, layout: 'tags', borderStyle: 'solid' },
          groups: [
            {
              id: 'grp-db',
              name: 'Stack',
              skills: ['React 18', 'TypeScript', 'Next.js', 'Module Federation', 'TailwindCSS', 'GraphQL', 'Web Workers', 'Performance Profiling', 'Jest', 'Playwright', 'Vite']
            }
          ]
        },
        {
          id: 'sec-db-proj',
          type: 'projects',
          title: 'PROJECT HIGHLIGHTS',
          items: [
            {
              id: 'proj-db1',
              name: 'MicroUI Core Framework',
              dateRange: '2023',
              subtitle: 'Next-gen federated frontend framework',
              bullets: ['Enables independent deployment of 14 separate frontend teams without code clashes.']
            }
          ]
        }
      ]
    }
  },

  {
    id: 'template-academic-oxford',
    name: 'Academic & Research (Oxford Style)',
    category: 'Academic',
    badge: 'Scholarly',
    description: 'Traditional academic styling with elegant serif headings, publication citations, and research focus.',
    theme: {
      templateStyle: 'academic-serif',
      primaryColor: '#431407',
      secondaryColor: '#1c1917',
      accentColor: '#9a3412',
      fontFamily: 'Merriweather, serif',
      fontSize: 'medium',
      lineSpacing: 'normal',
      columnLayout: 'single',
      borderStyle: 'solid'
    },
    sampleData: {
      id: 'resume-demo-academic',
      title: 'Academic Research Fellow Resume',
      lastModified: new Date().toISOString(),
      theme: {
        templateStyle: 'academic-serif',
        primaryColor: '#431407',
        secondaryColor: '#1c1917',
        accentColor: '#9a3412',
        fontFamily: 'Merriweather, serif',
        fontSize: 'medium',
        lineSpacing: 'normal',
        columnLayout: 'single',
        borderStyle: 'solid'
      },
      header: {
        name: 'DR. CLAIRE BEAUFORT',
        title: 'Postdoctoral Research Fellow in Computational Biology',
        phone: '+44 1865 270000',
        email: 'claire.beaufort@oxford-research.ac.uk',
        link: 'oxford.ac.uk/fellows/claire-beaufort',
        extraLink: '',
        location: 'Oxford, United Kingdom',
        settings: {
          showTitle: true,
          showPhone: true,
          showLink: true,
          showExtraLink: false,
          showEmail: true,
          showLocation: true,
          isUppercaseName: true,
          showPhoto: false
        }
      },
      leftColumn: [
        {
          id: 'sec-ac-sum',
          type: 'summary',
          title: 'RESEARCH STATEMENT',
          content: 'Computational Biologist and Biophysicist researching molecular dynamics, neural protein folding algorithms, and high-throughput genomic data pipelines. Lead investigator on 3 European Research Council (ERC) grant initiatives.',
          settings: { fontSize: 'normal', isBullet: false }
        },
        {
          id: 'sec-ac-edu',
          type: 'education',
          title: 'ACADEMIC APPOINTMENTS & EDUCATION',
          settings: { showGpa: false, showInstitution: true, showLocation: true, showDatePeriod: true },
          items: [
            {
              id: 'edu-ac1',
              degree: 'Postdoctoral Research Fellow in Genomic Sciences',
              institution: 'University of Oxford',
              dateRange: '2022 - Present',
              location: 'Oxford, UK',
              details: 'Laboratory of Molecular Biophysics. PI: Prof. Arthur Pendelton.'
            },
            {
              id: 'edu-ac2',
              degree: 'D.Phil (Ph.D.) in Computational Biophysics',
              institution: 'University of Cambridge',
              dateRange: '2018 - 2022',
              location: 'Cambridge, UK',
              details: 'Thesis: Algorithmic Modeling of Macromolecular Conformational States.'
            }
          ]
        },
        {
          id: 'sec-ac-exp',
          type: 'experience',
          title: 'SELECTED PUBLICATIONS & GRANTS',
          items: [
            {
              id: 'exp-ac1',
              role: 'Lead Author – Nature Computational Science',
              company: 'Nature Publishing Group',
              dateRange: '2023',
              bullets: [
                'Beaufort, C. et al. "Deep Learning Acceleration of All-Atom Protein Dynamics." Nature Comp. Sci. 4, 112-125.',
                'Selected as Cover Article and awarded Editor’s Choice in Structural Biology.'
              ]
            },
            {
              id: 'exp-ac2',
              role: 'Co-Principal Investigator – £450,000 ERC Research Grant',
              company: 'European Research Council',
              dateRange: '2022 - 2025',
              bullets: [
                'Funded 3-year computational study into targeted antiviral molecular inhibitors.'
              ]
            }
          ]
        }
      ],
      rightColumn: []
    }
  },

  {
    id: 'template-startup-pitch',
    name: 'Startup Pitch (Vibrant Violet)',
    category: 'Modern',
    badge: 'Dynamic',
    description: 'High energy violet gradient accents, modern metrics cards, tailored for founders & product managers.',
    theme: {
      templateStyle: 'vibrant-purple',
      primaryColor: '#7c3aed',
      secondaryColor: '#4c1d95',
      accentColor: '#a855f7',
      fontFamily: 'Poppins, sans-serif',
      fontSize: 'medium',
      lineSpacing: 'normal',
      columnLayout: '55-45',
      borderStyle: 'solid'
    },
    sampleData: {
      id: 'resume-demo-startup',
      title: 'Principal Product Manager Resume',
      lastModified: new Date().toISOString(),
      theme: {
        templateStyle: 'vibrant-purple',
        primaryColor: '#7c3aed',
        secondaryColor: '#4c1d95',
        accentColor: '#a855f7',
        fontFamily: 'Poppins, sans-serif',
        fontSize: 'medium',
        lineSpacing: 'normal',
        columnLayout: '55-45',
        borderStyle: 'solid'
      },
      header: {
        name: 'RYAN PATEL',
        title: 'Principal Product Manager & Venture Builder',
        phone: '+1 (415) 609-1234',
        email: 'ryan.patel.pm@example.com',
        link: 'linkedin.com/in/ryanpatel-product',
        extraLink: 'twitter.com/ryanpatel_pm',
        location: 'San Francisco, CA',
        settings: {
          showTitle: true,
          showPhone: true,
          showLink: true,
          showExtraLink: true,
          showEmail: true,
          showLocation: true,
          isUppercaseName: true,
          showPhoto: false
        }
      },
      leftColumn: [
        {
          id: 'sec-sp-sum',
          type: 'summary',
          title: 'EXECUTIVE SUMMARY',
          content: 'Product Leader and former founder with 8+ years scaling B2B SaaS and consumer AI products from 0 to $20M ARR. Champion of product-led growth (PLG), customer discovery sprints, and cross-functional agile orchestration.',
          settings: { fontSize: 'normal', isBullet: false }
        },
        {
          id: 'sec-sp-exp',
          type: 'experience',
          title: 'EXPERIENCE & VENTURES',
          items: [
            {
              id: 'exp-sp1',
              role: 'Principal Product Manager',
              company: 'Luminary AI Platform',
              dateRange: '2022 - Present',
              bullets: [
                'Launched enterprise AI assistant driving $14M ARR within 12 months of general availability.',
                'Spearheaded user research with 150+ Fortune 500 decision makers.'
              ]
            },
            {
              id: 'exp-sp2',
              role: 'Co-Founder & Head of Product',
              company: 'SyncPulse (Acquired by TechCorp)',
              dateRange: '2019 - 2022',
              bullets: [
                'Built workflow automation tool to 250k MAUs before successful strategic asset acquisition.'
              ]
            }
          ]
        },
        {
          id: 'sec-sp-edu',
          type: 'education',
          title: 'EDUCATION',
          settings: { showGpa: true, showInstitution: true, showLocation: true, showDatePeriod: true },
          items: [
            {
              id: 'edu-sp1',
              degree: 'B.S. in Management Information Systems',
              institution: 'Stanford University',
              dateRange: '2013 - 2017',
              location: 'Stanford, CA',
              gpa: '3.9'
            }
          ]
        }
      ],
      rightColumn: [
        {
          id: 'sec-sp-skills',
          type: 'skills',
          title: 'PRODUCT & STRATEGY',
          settings: { showGroupName: false, layout: 'tags', borderStyle: 'solid' },
          groups: [
            {
              id: 'grp-sp',
              name: 'Skills',
              skills: ['Product Strategy', 'PLG (Product-Led Growth)', 'Roadmapping', 'GTM (Go-To-Market)', 'SQL & Analytics', 'A/B Testing', 'Figma', 'Wireframing', 'Agile / Scrum', 'KPIs & OKRs']
            }
          ]
        },
        {
          id: 'sec-sp-proj',
          type: 'projects',
          title: 'VENTURE HIGHLIGHTS',
          items: [
            {
              id: 'proj-sp1',
              name: 'Y Combinator W20 Alum',
              dateRange: '2020',
              subtitle: 'Batch participant with SyncPulse',
              bullets: ['Raised $2.1M seed round from top Silicon Valley angels and venture funds.']
            }
          ]
        }
      ]
    }
  }
];

export const getTemplateById = (templateId) => {
  const found = RESUME_TEMPLATES.find((t) => t.id === templateId);
  return found || RESUME_TEMPLATES[0];
};
