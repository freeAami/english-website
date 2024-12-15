'use client'

import React, { useState, useMemo, useCallback } from 'react';
import { 
  Home, 
  Brain, 
  Watch, 
  AlertTriangle, 
  CheckCircle,
  Briefcase,
  GraduationCap,
  Search,
  Loader2,
  Heart,
  Shield,
  Users
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

// Data imports
import { MENTOR_PROFILES, IMPULSE_CATEGORIES, SKILL_CATEGORIES, JOB_DATABASE } from '@/lib/data';

// Mentor Matching Component
const MentorMatching = () => {
  const [surveyStep, setSurveyStep] = useState(0);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [matchedMentor, setMatchedMentor] = useState<any>(null);

  const surveyQuestions = useMemo(() => [
    {
      question: "What best describes your current challenges?",
      options: [
        { id: 'lonely', label: 'Feeling Lonely or Isolated' },
        { id: 'depression', label: 'Experiencing Depression' },
        { id: 'anxiety', label: 'Dealing with Anxiety' },
        { id: 'stress', label: 'Overwhelmed by Stress' },
        { id: 'tech-addiction', label: 'Technology Overuse' },
        { id: 'work-life-balance', label: 'Work-Life Balance' }
      ]
    }
  ], []);

  const toggleConcernSelection = useCallback((concernId: string) => {
    setSelectedConcerns(prev =>
      prev.includes(concernId)
        ? prev.filter(id => id !== concernId)
        : [...prev, concernId]
    );
  }, []);

  const findMentorMatch = useCallback(() => {
    const mentorScores = MENTOR_PROFILES.map(mentor => {
      const score = selectedConcerns.reduce((total, concern) => {
        return total + (mentor.keywordWeights[concern] || 0);
      }, 0);
      return { mentor, score };
    });

    const bestMatch = mentorScores.reduce((best, current) => 
      current.score > best.score ? current : best
    );

    setMatchedMentor(bestMatch.mentor);
  }, [selectedConcerns]);

  const renderSurveyStep = () => (
    <div className="space-y-6">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{surveyQuestions[surveyStep].question}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {surveyQuestions[surveyStep].options.map((option) => (
            <div 
              key={option.id} 
              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50"
            >
              <Checkbox
                id={option.id}
                checked={selectedConcerns.includes(option.id)}
                onCheckedChange={() => toggleConcernSelection(option.id)}
              />
              <label htmlFor={option.id} className="text-sm font-medium leading-none">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="default"
        className="w-full"
        onClick={findMentorMatch}
        disabled={selectedConcerns.length === 0}
      >
        Find My Mentor
      </Button>
    </div>
  );

  const renderMentorMatch = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">{matchedMentor.name}</h2>
        <p className="text-gray-600 mb-4">{matchedMentor.profession}</p>
        <p className="mb-4">{matchedMentor.bio}</p>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Available Times:</h3>
          <ul className="list-disc pl-5">
            {matchedMentor.availableTimes.map((time: string, index: number) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Specialties:</h3>
          <div className="flex flex-wrap gap-2">
            {matchedMentor.specialties.map((specialty: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-blue-100 rounded-full text-sm">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Testimonials:</h3>
          {matchedMentor.testimonials.map((testimonial: string, index: number) => (
            <div key={index} className="italic text-gray-600 mb-2">
              "{testimonial}"
            </div>
          ))}
        </div>
      </div>

      <Button 
        variant="outline" 
        onClick={() => setMatchedMentor(null)}
        className="w-full"
      >
        Find Another Mentor
      </Button>
    </div>
  );

  return matchedMentor ? renderMentorMatch() : renderSurveyStep();
};

// Safety Tools Component
const SafetyTools = () => {
  const [selectedImpulses, setSelectedImpulses] = useState<string[]>([]);
  const [deviceRequestStatus, setDeviceRequestStatus] = useState<string | null>(null);

  const toggleImpulseSelection = useCallback((impulseId: string) => {
    setSelectedImpulses(prev => 
      prev.includes(impulseId) 
        ? prev.filter(id => id !== impulseId)
        : [...prev, impulseId]
    );
  }, []);

  const renderSelectedImpulseDetails = () => {
    return selectedImpulses.map(impulseId => {
      const impulse = IMPULSE_CATEGORIES.find(cat => cat.id === impulseId);
      if (!impulse) return null;
      
      return (
        <Dialog key={impulseId}>
          <DialogTrigger asChild>
            <Button variant="outline" className="m-2">{impulse.name} Support</Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>{impulse.name} Support System</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold flex items-center">
                  <Watch className="mr-2" /> Wearable Device Features
                </h3>
                <p className="text-sm mt-2">{impulse.watchFeature}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold flex items-center">
                  <Brain className="mr-2" /> Support Mechanisms
                </h3>
                <ul className="list-disc pl-5 text-sm">
                  {impulse.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold flex items-center">
                  <Heart className="mr-2" /> Available Resources
                </h3>
                <ul className="list-disc pl-5 text-sm">
                  {impulse.supportResources.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    });
  };

  const handleDeviceRequest = useCallback(() => {
    setDeviceRequestStatus('loading');
    setTimeout(() => {
      setDeviceRequestStatus('success');
    }, 2000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Select Support Areas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {IMPULSE_CATEGORIES.map((category) => (
            <div 
              key={category.id} 
              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50"
            >
              <Checkbox
                id={category.id}
                checked={selectedImpulses.includes(category.id)}
                onCheckedChange={() => toggleImpulseSelection(category.id)}
              />
              <label htmlFor={category.id} className="text-sm font-medium leading-none">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {selectedImpulses.length > 0 && (
        <>
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Your Support Options</h2>
            <div className="flex flex-wrap">
              {renderSelectedImpulseDetails()}
            </div>
          </div>

          <Button 
            variant="default" 
            className="w-full" 
            onClick={handleDeviceRequest}
            disabled={deviceRequestStatus === 'loading'}
          >
            {deviceRequestStatus === 'loading' ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Request...
              </div>
            ) : deviceRequestStatus === 'success' ? (
              <div className="flex items-center justify-center">
                <CheckCircle className="mr-2" />
                Device Request Successful
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Shield className="mr-2" />
                Request Support Device
              </div>
            )}
          </Button>
        </>
      )}
    </div>
  );
};

// Skill Job Matcher Component
const SkillJobMatcher = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [matchedJobs, setMatchedJobs] = useState<any[]>([]);

  const toggleSkill = useCallback((skillId: string) => {
    setSelectedSkills(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  }, []);

  const findMatches = useCallback(() => {
    setIsLoading(true);
    setMatchedJobs([]);

    setTimeout(() => {
      const matches: any[] = [];
      
      selectedSkills.forEach(skill => {
        const jobs = JOB_DATABASE[skill] || [];
        jobs.forEach(job => {
          const relevantSkills = selectedSkills.filter(s => 
            JOB_DATABASE[s]?.includes(job)
          );
          
          if (!matches.find(m => m.title === job)) {
            matches.push({
              title: job,
              matchingSkills: relevantSkills,
              score: (relevantSkills.length / selectedSkills.length) * 100
            });
          }
        });
      });

      matches.sort((a, b) => b.score - a.score);
      setMatchedJobs(matches.slice(0, 10)); // Show top 10 matches
      setIsLoading(false);
    }, 1500);
  }, [selectedSkills]);

  const renderSkillSelection = (category: string, skills: any[]) => (
    <div className="bg-blue-100 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        {category === 'technical' && <Briefcase className="mr-2 h-5 w-5" />}
        {category === 'business' && <Briefcase className="mr-2 h-5 w-5" />}
        {category === 'soft' && <Users className="mr-2 h-5 w-5" />}
        {category} Skills
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div 
            key={skill.id}
            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Checkbox
              id={skill.id}
              checked={selectedSkills.includes(skill.id)}
              onCheckedChange={() => toggleSkill(skill.id)}
            />
            <label htmlFor={skill.id} className="text-sm font-medium leading-none">
              {skill.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderSkillSelection('technical', SKILL_CATEGORIES.technical)}
      {renderSkillSelection('business', SKILL_CATEGORIES.business)}
      {renderSkillSelection('soft', SKILL_CATEGORIES.soft)}

      <Button 
        onClick={findMatches}
        disabled={selectedSkills.length === 0 || isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Finding Matches
          </>
        ) : (
          <>
            <Search className="mr-2" />
            Find Matching Jobs
          </>
        )}
      </Button>

      {matchedJobs.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Matched Opportunities</h2>
          <div className="space-y-4">
            {matchedJobs.map((job, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-lg">{job.title}</h4>
                      <span className="text-sm text-green-600 flex items-center">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        {Math.round(job.score)}% match
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{job.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Matching Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.matchingSkills.map((skill: string) => (
                          <span 
                            key={skill}
                            className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                          >
                            {Object.values(SKILL_CATEGORIES)
                              .flat()
                              .find(s => s.id === skill)?.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main UnifiedSupportPortal component
export const UnifiedSupportPortal = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
          <Home className="mr-3" /> Comprehensive Support Portal
        </h1>
        
        <Tabs defaultValue="mentorship" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="mentorship">
              <Brain className="mr-2" /> Mental Health Support
            </TabsTrigger>
            <TabsTrigger value="safety">
              <AlertTriangle className="mr-2" /> Safety Tools
            </TabsTrigger>
            <TabsTrigger value="career">
              <Briefcase className="mr-2" /> Career Matching
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="mentorship">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2" /> Mental Health Mentor Matching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MentorMatching />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="safety">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2" /> Safety Support Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SafetyTools />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="career">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2" /> Career Opportunity Matcher
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SkillJobMatcher />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
