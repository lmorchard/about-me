/**
 * Generate Schema.org JSON-LD structured data for Person
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Les Orchard",
    "alternateName": "lmorchard",
    "url": "https://lmorchard.com",
    "email": "me@lmorchard.com",
    "image": "https://www.gravatar.com/avatar/b45c48fc9e05922e2f368a9d7d7d8de1?s=400",
    "jobTitle": "Staff Engineer",
    "description": "Software developer, writer, and self-described serial enthusiast with 25+ years building on the web. Authored technical books on RSS and feeds. Built developer tools at Mozilla, GitHub, and Yahoo.",
    "sameAs": [
      "https://github.com/lmorchard",
      "https://masto.hackers.town/@lmorchard",
      "https://blog.lmorchard.com",
      "https://www.youtube.com/@LesOrchard",
      "https://twitch.tv/lmorchard"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Central Michigan University",
      "location": "Mount Pleasant, MI"
    },
    "knowsAbout": [
      "JavaScript",
      "Node.js",
      "Python",
      "Go",
      "Web Development",
      "RSS",
      "Atom Feeds",
      "React",
      "Django",
      "Static Site Generation",
      "Browser Extensions",
      "Firefox",
      "Developer Tools",
      "IndieWeb",
      "GraphQL",
      "REST APIs",
      "OAuth",
      "OpenID Connect"
    ],
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "English"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "Bachelor of Science",
        "educationalLevel": "undergraduate",
        "about": [
          "Computer Science",
          "Psychology"
        ]
      }
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Mozilla Corporation",
      "url": "https://www.mozilla.org"
    }
  };
}
