'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { contactFormSchema, ContactFormData } from '@/lib/zod-schemas';
import { PERSONAL_INFO } from '@/data/portfolio';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      roleType: 'Full-Time Role',
      message: '',
      honeypot: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    // Check Honeypot spam field
    if (data.honeypot && data.honeypot.length > 0) {
      console.warn('Spam submission detected by honeypot.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit form.');
      }

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: unknown) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-code text-xs font-semibold uppercase tracking-wider">
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Let&apos;s Build Something <span className="gradient-text font-display font-bold">Exceptional</span>
          </h2>
          <p className="text-muted text-sm sm:text-base">
            I am actively looking for full-stack software developer opportunities & internships. Send me a message and I will respond within 24 hours.
          </p>
        </div>

        {/* Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Honeypot Spam Prevention (Hidden Input) */}
              <input
                type="text"
                {...register('honeypot')}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name Input */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="name" className="text-xs font-semibold text-foreground">
                  Your Name <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Sarah Connor"
                  {...register('name')}
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border text-foreground text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
                {errors.name && (
                  <p className="text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name.message}</span>
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="email" className="text-xs font-semibold text-foreground">
                  Work Email <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="sarah@company.com"
                  {...register('email')}
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border text-foreground text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
                {errors.email && (
                  <p className="text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email.message}</span>
                  </p>
                )}
              </div>

              {/* Role / Inquiry Dropdown */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="roleType" className="text-xs font-semibold text-foreground">
                  Inquiry / Opportunity Type
                </label>
                <select
                  id="roleType"
                  {...register('roleType')}
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border text-foreground text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="Full-Time Role">Full-Time Software Engineer Role</option>
                  <option value="Full-Stack Developer">Full-Stack Developer (MERN / Java)</option>
                  <option value="Software Internship">Software Developer Internship</option>
                  <option value="Freelance Project">Freelance / Contract Project</option>
                  <option value="General Inquiry">General Networking</option>
                </select>
              </div>

              {/* Message Input */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="message" className="text-xs font-semibold text-foreground">
                  Project Details or Job Role Opportunity <span className="text-indigo-400">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Describe your project vision or role opportunity..."
                  {...register('message')}
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border text-foreground text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 px-6 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Success Alert */}
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Message sent successfully! Thank you for reaching out.</span>
                </div>
              )}

              {/* Error Alert */}
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage || 'Failed to send message. Please try again.'}</span>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Direct Info & Testimonial */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Direct Contact Details Card */}
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
              <h3 className="text-lg font-display font-bold text-foreground">Direct Contact Info</h3>
              
              <div className="space-y-3 text-sm text-muted">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href={PERSONAL_INFO.socialLinks.email} className="text-foreground hover:text-indigo-400 transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <a href={PERSONAL_INFO.socialLinks.phone} className="text-foreground hover:text-indigo-400 transition-colors">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="pt-4 border-t border-border/60 flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-indigo-500 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-indigo-500 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Testimonial Quote Card */}
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm relative overflow-hidden">
              <span className="text-5xl font-display text-indigo-500/30 leading-none select-none">“</span>
              <p className="text-xs sm:text-sm text-muted italic leading-relaxed -mt-4">
                Sandesh is a dedicated full-stack developer who builds clean, reliable software with great attention to detail. His proficiency in MERN stack and Spring Boot makes him a valuable asset to engineering teams.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  SH
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Sandesh Virupakshayya Hiremath</h4>
                  <p className="text-[11px] text-muted">Dr. D.Y. Patil ACS & Deloitte Simulation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;

