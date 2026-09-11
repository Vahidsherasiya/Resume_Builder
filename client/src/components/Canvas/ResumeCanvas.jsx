import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import HeaderSection from './HeaderSection';
import SummarySection from './SummarySection';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import StrengthsSection from './StrengthsSection';
import SkillsSection from './SkillsSection';
import LanguagesSection from './LanguagesSection';
import ProjectsSection from './ProjectsSection';
import CertificationsSection from './CertificationsSection';
import InterestsSection from './InterestsSection';
import CustomSection from './CustomSection';
import AddSectionModal from '../Modals/AddSectionModal';

export default function ResumeCanvas({ resume, onResumeChange, printRef }) {
  const [activeAddModalCol, setActiveAddModalCol] = useState(null); // 'left' | 'right' | null

  const theme = resume.theme || {
    primaryColor: '#00c598',
    fontFamily: 'Inter',
    columnLayout: '55-45'
  };

  const handleHeaderChange = (newHeader) => {
    onResumeChange({
      ...resume,
      header: newHeader
    });
  };

  const handleSectionChange = (column, index, updatedSection) => {
    const colKey = column === 'left' ? 'leftColumn' : 'rightColumn';
    const list = [...(resume[colKey] || [])];
    list[index] = updatedSection;
    onResumeChange({
      ...resume,
      [colKey]: list
    });
  };

  const handleDeleteSection = (column, index) => {
    const colKey = column === 'left' ? 'leftColumn' : 'rightColumn';
    const list = (resume[colKey] || []).filter((_, i) => i !== index);
    onResumeChange({
      ...resume,
      [colKey]: list
    });
  };

  const handleMoveSection = (column, index, direction) => {
    const colKey = column === 'left' ? 'leftColumn' : 'rightColumn';
    const list = [...(resume[colKey] || [])];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    onResumeChange({
      ...resume,
      [colKey]: list
    });
  };

  const handleSwitchColumn = (fromCol, index) => {
    const sourceKey = fromCol === 'left' ? 'leftColumn' : 'rightColumn';
    const targetKey = fromCol === 'left' ? 'rightColumn' : 'leftColumn';

    const sourceList = [...(resume[sourceKey] || [])];
    const targetList = [...(resume[targetKey] || [])];

    const [item] = sourceList.splice(index, 1);
    targetList.push(item);

    onResumeChange({
      ...resume,
      [sourceKey]: sourceList,
      [targetKey]: targetList
    });
  };

  const handleAddSection = (sectionType, column) => {
    const colKey = column === 'left' ? 'leftColumn' : 'rightColumn';
    const currentList = [...(resume[colKey] || [])];

    let newSection = {
      id: `sec-${sectionType}-${Date.now()}`,
      type: sectionType,
      title: sectionType.toUpperCase()
    };

    if (sectionType === 'summary') {
      newSection.content = 'Write your professional summary or career vision statement here...';
    } else if (sectionType === 'experience') {
      newSection.items = [
        {
          id: 'exp-' + Date.now(),
          role: 'Full Stack Engineer',
          company: 'Tech Solutions Inc.',
          dateRange: '2023 - Present',
          bullets: ['Built scalable microservices and dynamic web user interfaces']
        }
      ];
    } else if (sectionType === 'education') {
      newSection.items = [
        {
          id: 'edu-' + Date.now(),
          degree: 'B.Tech in Computer Science',
          institution: 'University Name',
          dateRange: '08/2022 - 05/2026',
          location: 'City, Country',
          gpa: '4.0',
          gpaMax: '4.0',
          details: 'Core subjects and honors'
        }
      ];
      newSection.settings = {
        showGpa: true,
        showInstitution: true,
        showLocation: false,
        showDatePeriod: true,
        showBullets: false,
        showLogo: false
      };
    } else if (sectionType === 'skills') {
      newSection.groups = [
        {
          id: 'grp-1',
          name: 'Core Skills',
          skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript']
        }
      ];
      newSection.settings = { showGroupName: false, layout: 'tags', borderStyle: 'solid' };
    } else if (sectionType === 'strengths') {
      newSection.items = [
        {
          id: 'str-1',
          icon: 'heart',
          title: 'Leadership & Teamwork',
          description: 'Effective communicator with collaborative mindset'
        }
      ];
      newSection.settings = { showTitle: true, showDescription: true, showIcons: true };
    } else if (sectionType === 'interests') {
      newSection.items = [
        {
          id: 'int-1',
          icon: 'lightbulb',
          title: 'Interests',
          description: 'Technology Reading, Music, Sports'
        }
      ];
      newSection.settings = { showDescription: true, showIcons: true };
    } else if (sectionType === 'languages') {
      newSection.items = [
        { id: 'lang-1', language: 'English', proficiency: 'Fluent', rating: 5 }
      ];
      newSection.settings = { showProficiency: true, showSlider: true, sliderStyle: 'dots' };
    } else if (sectionType === 'projects') {
      newSection.items = [
        {
          id: 'proj-1',
          name: 'E-Commerce Platform',
          dateRange: '2024',
          subtitle: 'MERN Stack Web Application',
          bullets: ['Integrated secure Stripe checkout & inventory management']
        }
      ];
    } else if (sectionType === 'certifications') {
      newSection.items = [
        { id: 'cert-1', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2024' }
      ];
    } else {
      newSection.items = [
        { id: 'custom-1', title: 'Key Achievement', description: 'Detail description goes here.' }
      ];
    }

    currentList.push(newSection);
    onResumeChange({
      ...resume,
      [colKey]: currentList
    });
  };

  const renderSection = (sec, idx, column) => {
    const list = column === 'left' ? (resume.leftColumn || []) : (resume.rightColumn || []);
    const props = {
      key: sec.id || `${column}-${idx}`,
      section: sec,
      theme,
      onChange: (updated) => handleSectionChange(column, idx, updated),
      onDelete: () => handleDeleteSection(column, idx),
      onMoveUp: idx > 0 ? () => handleMoveSection(column, idx, -1) : undefined,
      onMoveDown: idx < list.length - 1 ? () => handleMoveSection(column, idx, 1) : undefined,
      onSwitchColumn: () => handleSwitchColumn(column, idx)
    };

    switch (sec.type) {
      case 'summary':
        return <SummarySection {...props} />;
      case 'education':
        return <EducationSection {...props} />;
      case 'experience':
        return <ExperienceSection {...props} />;
      case 'strengths':
        return <StrengthsSection {...props} />;
      case 'skills':
        return <SkillsSection {...props} />;
      case 'interests':
        return <InterestsSection {...props} />;
      case 'languages':
        return <LanguagesSection {...props} />;
      case 'projects':
        return <ProjectsSection {...props} />;
      case 'certifications':
        return <CertificationsSection {...props} />;
      default:
        return <CustomSection {...props} />;
    }
  };

  // Layout grid split classes
  let gridColsClass = 'grid-cols-1 md:grid-cols-12 gap-8';
  let leftSpan = 'md:col-span-7';
  let rightSpan = 'md:col-span-5';

  if (theme.columnLayout === '50-50') {
    leftSpan = 'md:col-span-6';
    rightSpan = 'md:col-span-6';
  } else if (theme.columnLayout === '60-40') {
    leftSpan = 'md:col-span-7';
    rightSpan = 'md:col-span-5';
  } else if (theme.columnLayout === '40-60') {
    leftSpan = 'md:col-span-5';
    rightSpan = 'md:col-span-7';
  } else if (theme.columnLayout === 'single') {
    gridColsClass = 'grid-cols-1 gap-6';
    leftSpan = 'col-span-1';
    rightSpan = 'col-span-1';
  }

  return (
    <div className="flex justify-center p-4 sm:p-8 overflow-x-auto">
      {/* A4 Printable Paper Container */}
      <div
        ref={printRef}
        className="a4-page rounded-sm font-sans"
        style={{
          fontFamily: theme.fontFamily || 'Inter, sans-serif'
        }}
      >
        {/* Top Header Section */}
        <HeaderSection
          header={resume.header}
          onChange={handleHeaderChange}
          theme={theme}
        />

        {/* Two-Column Grid Layout */}
        <div className={`grid ${gridColsClass}`}>
          {/* Left Column */}
          <div className={leftSpan}>
            {(resume.leftColumn || []).map((sec, idx) => renderSection(sec, idx, 'left'))}

            {/* Enhancv Green Pill + New Section Button */}
            <div className="pt-2 no-print flex justify-start">
              <button
                type="button"
                onClick={() => setActiveAddModalCol('left')}
                className="btn-new-section no-print inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#00a37e] bg-[#e6faf5] hover:bg-[#00c598] hover:text-white border border-[#00c598]/40 rounded-full transition-all duration-150 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Section</span>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className={rightSpan}>
            {(resume.rightColumn || []).map((sec, idx) => renderSection(sec, idx, 'right'))}

            {/* Enhancv Green Pill + New Section Button */}
            <div className="pt-2 no-print flex justify-start">
              <button
                type="button"
                onClick={() => setActiveAddModalCol('right')}
                className="btn-new-section no-print inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#00a37e] bg-[#e6faf5] hover:bg-[#00c598] hover:text-white border border-[#00c598]/40 rounded-full transition-all duration-150 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Section</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Section Modal Popup */}
      {activeAddModalCol && (
        <AddSectionModal
          column={activeAddModalCol}
          onAddSection={(type, col) => handleAddSection(type, col)}
          onClose={() => setActiveAddModalCol(null)}
        />
      )}
    </div>
  );
}
