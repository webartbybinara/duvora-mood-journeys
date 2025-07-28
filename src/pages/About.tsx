import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Heart, Compass, Sparkles, Users, Award, Globe } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Emotional Connection",
      description: "We believe travel is about feeling, not just seeing. Every recommendation connects with your emotional state."
    },
    {
      icon: Compass,
      title: "Authentic Discovery",
      description: "Beyond tourist trails, we curate experiences that reveal the true soul of Sri Lanka."
    },
    {
      icon: Sparkles,
      title: "Mindful Curation",
      description: "Each property is personally selected for its ability to create meaningful memories."
    }
  ];

  const stats = [
    { number: "50+", label: "Curated Properties", icon: Award },
    { number: "500+", label: "Happy Travelers", icon: Users },
    { number: "7", label: "Regions Covered", icon: Globe }
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-serene pt-20">
        <div className="container-xl py-8 lg:py-12">
          <Breadcrumbs />
          
          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="text-center mb-12 animate-fade-in-up">
              <Badge className="mb-4 text-sm px-4 py-2">
                Our Story
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                Travel with Purpose,
                <br />
                <span className="text-primary">Stay with Soul</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Duvora Collection was born from a simple belief: that the best travel experiences 
                begin with understanding how you feel, not just where you want to go.
              </p>
            </header>

            {/* Story Section */}
            <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-xl leading-relaxed mb-8">
                  Founded in the heart of Sri Lanka by travelers who fell in love with the island's 
                  emotional landscape, we recognized that every journey carries a unique emotional signature. 
                  Whether you're seeking romance, adventure, solitude, or wonder, your accommodation 
                  should amplify these feelings, not just provide a place to sleep.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  Our team has spent years building relationships with property owners who share our 
                  vision of hospitality as an art form. Each property in our collection is chosen not 
                  just for its amenities or location, but for its ability to create an emotional resonance 
                  with our guests.
                </p>
                
                <p className="text-lg leading-relaxed">
                  From jungle treehouses that awaken your sense of adventure to oceanfront villas 
                  that inspire romance, every stay is designed to be a catalyst for the experiences 
                  your soul is seeking.
                </p>
              </div>
            </section>

            {/* Values */}
            <section className="mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-foreground text-center mb-12">
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <Card 
                    key={value.title}
                    className="p-8 text-center hover:shadow-dreamy transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent p-4">
                      <value.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-medium text-foreground mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Stats */}
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label}
                    className="text-center animate-fade-in-up"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 mx-auto mb-4 text-primary">
                      <stat.icon className="w-full h-full" />
                    </div>
                    <div className="text-4xl font-light text-foreground mb-2">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Mission Statement */}
            <section className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  To transform the way people discover and experience accommodation by creating 
                  an intuitive, emotion-driven platform that connects travelers with spaces 
                  that truly resonate with their inner journey.
                </p>
              </Card>
            </section>
          </article>
        </div>
      </main>
    </>
  );
};

export default About;