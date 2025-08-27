import { Heart, Target, Users, Zap, Code2, Globe, Award, TrendingUp, Rocket, Coffee, Sparkles } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { number: "50K+", label: "Active Developers" },
    { number: "100K+", label: "Connections Made" },
    { number: "95%", label: "Success Rate" },
    { number: "120+", label: "Countries" }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Developer First",
      description: "We prioritize the needs and experiences of developers above all else."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Driven",
      description: "Building meaningful connections through shared interests and goals."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Quality Matches",
      description: "Our algorithm ensures you connect with developers who share your vision."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation",
      description: "Constantly evolving to meet the changing needs of the tech community."
    }
  ];

  const creator = {
    name: "Snehil Verma",
    role: "Full Stack Developer & Creator",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Snehil",
    bio: "Code craftsman by day, bug hunter by night. Building DevConnect to solve a problem I faced myself - finding the right developers to collaborate with. Passionate about creating elegant solutions to complex problems and firm believer that the best code is written with coffee and good music. When I'm not pushing pixels or debugging APIs, you'll find me exploring new tech stacks or contributing to open source. Let's connect and build something amazing together! 🚀",
    github: "https://github.com/being-snehil",
    linkedin: "https://www.linkedin.com/in/snehil-verma-1b685b252/"
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About DevConnect
            </h1>
            <p className="text-xl text-base-content/80 mb-8">
              We're on a mission to revolutionize how developers connect, collaborate, and grow together.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-base-content/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">The Story</h2>
            <div className="prose prose-lg mx-auto text-base-content/80">
              <p className="mb-6">
                DevConnect was born from a simple frustration: Why is it so hard for developers to find 
                their perfect collaborator? As a full-stack developer, I've spent countless hours on 
                forums, Discord servers, and social media trying to find developers who share the same 
                passion and vision.
              </p>
              <p className="mb-6">
                That's when it hit me - developers need a platform built by a developer, for developers. 
                No corporate jargon, no unnecessary features, just a clean, intuitive space where code 
                meets creativity and projects find their perfect teams.
              </p>
              <p>
                What started as a side project fueled by late-night coding sessions and too much coffee 
                has grown into DevConnect - a thriving community where developers don't just network, 
                they build lasting partnerships and friendships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="card-title text-xl mb-2">{value.title}</h3>
                  <p className="text-base-content/70">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Meet the Creator</h2>
          <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
            One developer's mission to connect the global developer community
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="card lg:card-side bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <figure className="lg:w-1/3 p-8">
                <img 
                  src={creator.image} 
                  alt={creator.name} 
                  className="w-48 h-48 object-cover rounded-xl"
                />
              </figure>
              <div className="card-body lg:w-2/3">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="card-title text-2xl">{creator.name}</h3>
                  <div className="badge badge-primary gap-1">
                    <Sparkles className="w-3 h-3" />
                    Creator
                  </div>
                </div>
                <p className="text-primary mb-4 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  {creator.role}
                </p>
                <p className="text-base-content/80 mb-6 leading-relaxed">{creator.bio}</p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href={creator.github}
                    className="btn btn-sm btn-outline gap-2 hover:btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a 
                    href={creator.linkedin}
                    className="btn btn-sm btn-outline gap-2 hover:btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <div className="flex items-center gap-2 text-base-content/60">
                    <Coffee className="w-4 h-4" />
                    <span className="text-sm">Powered by coffee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join the Revolution?</h2>
          <p className="text-xl text-base-content/80 mb-8 max-w-2xl mx-auto">
            Start connecting with developers who share your passion and build amazing things together
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/signup" className="btn btn-primary btn-lg gap-2">
              <Rocket className="w-5 h-5" />
              Get Started
            </a>
            <a href="/" className="btn btn-outline btn-lg gap-2">
              <Globe className="w-5 h-5" />
              Explore Platform
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;