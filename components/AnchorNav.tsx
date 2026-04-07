'use client';

import { useState, useEffect, useRef } from 'react';

const AnchorNav = () => {
  const [activeId, setActiveId] = useState<string>('overview');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const navItems = [
    { label: 'Overview', href: '#overview', id: 'overview' },
    { label: 'What is MyCaseValue?', href: '#what-is', id: 'what-is' },
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'Who is it for?', href: '#who', id: 'who' },
    { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { label: 'Awards', href: '#awards', id: 'awards' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'Start Researching', href: '/search', id: 'trial', isExternal: true },
  ];

  useEffect(() => {
    // Set up IntersectionObserver to track which section is in view
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-112px 0px -66% 0px',
        threshold: 0.1,
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle smooth scroll for anchor links (starting with #)
    if (!href.startsWith('#')) {
      return;
    }

    e.preventDefault();

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setActiveId(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="anchor-nav" style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        position: 'sticky',
        top: '112px',
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          overflowX: 'auto',
        }}>
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            const isTrialButton = item.id === 'trial';

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                style={{
                  padding: '14px 20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: isTrialButton ? '#0966C3' : isActive ? '#0f0f0f' : '#4B5563',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  whiteSpace: 'nowrap',
                  borderBottom: isActive && !isTrialButton ? '2px solid #0966C3' : '2px solid transparent',
                  transition: 'all 150ms',
                  cursor: 'pointer',
                }}
                className="anchor-nav-link"
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .anchor-nav-link:hover { color: #0f0f0f !important; border-bottom-color: #0966C3 !important; }
        @media (max-width: 768px) {
          .anchor-nav { display: none !important; }
        }
      `}} />
    </>
  );
};

export default AnchorNav;
