import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Send, Heart } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["Colombo, Sri Lanka", "Serving all regions of the island"]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+94 11 234 5678", "Available 24/7 for emergencies"]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@duvora.lk", "We respond within 24 hours"]
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Weekend support available"]
    }
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-serene pt-20">
        <div className="container-xl py-8 lg:py-12">
          <Breadcrumbs />
          
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <header className="text-center mb-12 animate-fade-in-up">
              <Badge className="mb-4 text-sm px-4 py-2">
                Get in Touch
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                Let's Plan Your
                <br />
                <span className="text-primary">Perfect Journey</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Whether you have questions about our properties, need travel advice, or want to 
                share your experience, we're here to help make your Sri Lankan adventure unforgettable.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <Card className="p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Heart className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-light text-foreground">Send Us a Message</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Your Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What can we help you with?"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your travel plans, questions, or how we can assist you..."
                        className="w-full min-h-[120px] resize-none"
                        rows={5}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="default" 
                      size="lg" 
                      className="w-full"
                    >
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </Card>
              </section>

              {/* Contact Information */}
              <section className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-2xl font-light text-foreground mb-8">
                  Contact Information
                </h2>
                
                {contactInfo.map((info, index) => (
                  <Card 
                    key={info.title}
                    className="p-6 hover:shadow-medium transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent p-3 flex-shrink-0">
                        <info.icon className="w-full h-full text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p 
                            key={idx} 
                            className={`${idx === 0 ? 'text-foreground font-medium' : 'text-muted-foreground text-sm'}`}
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Quick Response Promise */}
                <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent p-3">
                      <Heart className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Our Promise
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We're passionate about creating exceptional experiences. Every inquiry 
                      receives personal attention from our travel specialists who know Sri Lanka intimately.
                    </p>
                  </div>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;