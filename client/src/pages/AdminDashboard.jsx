import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { PageTransition } from '@/components/PageTransition';
import { BarChart3, FolderKanban, Users, MessageSquare, Mail, Plus, Edit, Trash2, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('analytics');
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLocation('/admin/login');
    }
  }, [setLocation]);

  const { data: projects } = useQuery({ queryKey: ['/api/projects'] });
  const { data: services } = useQuery({ queryKey: ['/api/services'] });
  const { data: team } = useQuery({ queryKey: ['/api/team'] });
  const { data: testimonials } = useQuery({ queryKey: ['/api/testimonials'] });
  const { data: contacts } = useQuery({ queryKey: ['/api/contacts'] });

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast({
      title: 'Logged out successfully',
    });
    setLocation('/admin/login');
  };

  const handleDelete = async (type, id) => {
    try {
      await apiRequest('DELETE', `/api/${type}/${id}`);
      queryClient.invalidateQueries({ queryKey: [`/api/${type}`] });
      toast({
        title: 'Deleted successfully',
      });
      setDeleteConfirm(null);
    } catch (error) {
      toast({
        title: 'Error deleting item',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const stats = [
    { label: 'Total Projects', value: projects?.length || 0, icon: FolderKanban },
    { label: 'Services', value: services?.length || 0, icon: BarChart3 },
    { label: 'Team Members', value: team?.length || 0, icon: Users },
    { label: 'Testimonials', value: testimonials?.length || 0, icon: MessageSquare },
    { label: 'Contact Forms', value: contacts?.length || 0, icon: Mail },
  ];

  return (
    <PageTransition>
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your Nexus Blend content</p>
          </div>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="analytics" data-testid="tab-analytics">Analytics</TabsTrigger>
            <TabsTrigger value="projects" data-testid="tab-projects">Projects</TabsTrigger>
            <TabsTrigger value="services" data-testid="tab-services">Services</TabsTrigger>
            <TabsTrigger value="team" data-testid="tab-team">Team</TabsTrigger>
            <TabsTrigger value="testimonials" data-testid="tab-testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="contacts" data-testid="tab-contacts">Contacts</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={idx} className="p-6" data-testid={`stat-card-${idx}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                        <p className="text-4xl font-bold">{stat.value}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="mb-4">
              <Button data-testid="button-add-project">
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </div>
            
            <div className="grid gap-4">
              {projects?.map((project) => (
                <Card key={project.id} className="p-6" data-testid={`card-project-${project.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{project.category}</p>
                      <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" data-testid={`button-edit-project-${project.id}`}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setDeleteConfirm({ type: 'projects', id: project.id })}
                        data-testid={`button-delete-project-${project.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="mb-4">
              <Button data-testid="button-add-service">
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </div>
            
            <div className="grid gap-4">
              {services?.map((service) => (
                <Card key={service.id} className="p-6" data-testid={`card-service-${service.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" data-testid={`button-edit-service-${service.id}`}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setDeleteConfirm({ type: 'services', id: service.id })}
                        data-testid={`button-delete-service-${service.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <div className="mb-4">
              <Button data-testid="button-add-team">
                <Plus className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </div>
            
            <div className="grid gap-4">
              {team?.map((member) => (
                <Card key={member.id} className="p-6" data-testid={`card-team-${member.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-primary text-sm">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" data-testid={`button-edit-team-${member.id}`}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setDeleteConfirm({ type: 'team', id: member.id })}
                        data-testid={`button-delete-team-${member.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div className="mb-4">
              <Button data-testid="button-add-testimonial">
                <Plus className="mr-2 h-4 w-4" />
                Add Testimonial
              </Button>
            </div>
            
            <div className="grid gap-4">
              {testimonials?.map((testimonial) => (
                <Card key={testimonial.id} className="p-6" data-testid={`card-testimonial-${testimonial.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{testimonial.clientName}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {testimonial.clientRole} at {testimonial.clientCompany}
                      </p>
                      <p className="text-muted-foreground text-sm line-clamp-2">"{testimonial.content}"</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" data-testid={`button-edit-testimonial-${testimonial.id}`}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setDeleteConfirm({ type: 'testimonials', id: testimonial.id })}
                        data-testid={`button-delete-testimonial-${testimonial.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <div className="grid gap-4">
              {contacts?.map((contact) => (
                <Card key={contact.id} className="p-6" data-testid={`card-contact-${contact.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{contact.email}</p>
                      <p className="text-sm font-medium mb-1">Subject: {contact.subject}</p>
                      <p className="text-muted-foreground text-sm line-clamp-2">{contact.message}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setDeleteConfirm({ type: 'contacts', id: contact.id })}
                        data-testid={`button-delete-contact-${contact.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground mb-6">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} data-testid="button-cancel-delete">
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => handleDelete(deleteConfirm.type, deleteConfirm.id)}
              data-testid="button-confirm-delete"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </PageTransition>
  );
}
