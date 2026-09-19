import React, { useState } from 'react';
import { Plus, ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';
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

  const handleSectionUpdate = (column, colIndex, updatedSec, isSplit, splitPart, splitOffset = 0) => {
    const colKey = column === 'left' ? 'leftColumn' : 'rightColumn';
    const list = [...(resume[colKey] || [])];
    const originalSec = list[colIndex];

    if (!isSplit || !originalSec || !originalSec.items) {
      list[colIndex] = updatedSec;
    } else {
      // Merge split items back into original section
      const originalItems = [...(originalSec.items || [])];
      const updatedItems = updatedSec.items || [];
      const updatedCount = updatedItems.length;
      originalItems.splice(splitOffset, updatedCount, ...updatedItems);
      list[colIndex] = {
        ...originalSec,
        ...updatedSec,
        title: originalSec.title,
        items: originalItems
      };
    }

    onResumeChange({
      ...resume,
      [colKey]: list
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
          institution: 'Stanford University',
          dateRange: '2019 - 2023',
          location: 'Stanford, CA',
          gpa: '3.9',
          gpaMax: '4.0',
          bullets: ['Graduated with Academic Honors and Dean\'s List distinction']
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
        { id: 'grp-1', name: 'Technical Stack', skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'] }
      ];
      newSection.settings = { showGroupName: true, layout: 'tags', borderStyle: 'solid' };
    } else if (sectionType === 'strengths') {
      newSection.items = [
        { id: 'str-1', title: 'System Architecture', description: 'Expert in resilient distributed cloud systems' },
        { id: 'str-2', title: 'Problem Solving', description: 'Fast root-cause debugger with critical analysis' }
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
        { id: 'lang-1', language: 'English', proficiency: 'Native / Bilingual', rating: 5 },
        { id: 'lang-2', language: 'Spanish', proficiency: 'Professional Working', rating: 4 }
      ];
      newSection.settings = { showProficiency: true, showSlider: true, sliderStyle: 'dots' };
    } else if (sectionType === 'projects') {
      newSection.items = [
        {
          id: 'proj-' + Date.now(),
          name: 'AI Analytics Platform',
          client: 'Enterprise Client',
          dateRange: '2023 - 2024',
          link: 'https://github.com/project',
          bullets: ['Engineered high-throughput analytics pipeline delivering sub-second insights']
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

  // Height estimator helpers
  const estimateItemHeight = (type, item) => {
    if (type === 'languages') return 42;
    if (type === 'education') return 70;
    if (type === 'experience') return 60 + (item?.bullets?.length || 1) * 22;
    if (type === 'projects') return 60 + (item?.bullets?.length || 1) * 22;
    if (type === 'skills') return 42;
    if (type === 'strengths') return 52;
    if (type === 'interests') return 44;
    if (type === 'certifications') return 48;
    return 48;
  };

  const estimateSectionHeight = (sec) => {
    let h = 50; // title and margins
    if (sec.type === 'summary') {
      return h + Math.max(50, Math.ceil((sec.content?.length || 0) / 60) * 20);
    }
    if (sec.type === 'skills') {
      (sec.groups || []).forEach((g) => {
        h += 32 + Math.ceil((g.skills?.length || 1) / 3) * 28;
      });
      return h;
    }
    (sec.items || []).forEach((it) => {
      h += estimateItemHeight(sec.type, it);
    });
    return h;
  };

  // Multi-page pagination: distributes sections and items across Page 1, Page 2, Page 3, ... N pages
  const paginateColumnMultiPage = (sections, maxPage1H = 710, maxPageNH = 880) => {
    if (!sections || sections.length === 0) return [[]];

    const pages = [[]];
    let pageIdx = 0;
    let currentH = 0;

    const getLimit = (idx) => (idx === 0 ? maxPage1H : maxPageNH);

    for (let sIdx = 0; sIdx < sections.length; sIdx++) {
      const sec = sections[sIdx];
      let limit = getLimit(pageIdx);
      const secH = estimateSectionHeight(sec);

      // Fits entirely in current page
      if (currentH + secH <= limit) {
        pages[pageIdx].push({
          sec,
          colIndex: sIdx,
          isSplit: false
        });
        currentH += secH;
        continue;
      }

      // If it has multiple items and current page has some room, split items
      if (sec.items && sec.items.length > 1 && currentH < limit - 80) {
        let fitCount = 0;
        let accumH = currentH + 50; // Section title & margin
        for (let i = 0; i < sec.items.length; i++) {
          const itH = estimateItemHeight(sec.type, sec.items[i]);
          if (accumH + itH <= limit) {
            accumH += itH;
            fitCount++;
          } else {
            break;
          }
        }

        if (fitCount > 0 && fitCount < sec.items.length) {
          const p1Items = sec.items.slice(0, fitCount);
          let remainingItems = sec.items.slice(fitCount);

          pages[pageIdx].push({
            sec: { ...sec, items: p1Items },
            colIndex: sIdx,
            isSplit: true,
            splitPart: `p${pageIdx + 1}`,
            splitOffset: 0
          });

          // Move to next page
          pageIdx++;
          pages[pageIdx] = [];
          currentH = 0;
          limit = getLimit(pageIdx);

          let offset = fitCount;

          while (remainingItems.length > 0) {
            const remSec = { ...sec, items: remainingItems };
            const remSecH = estimateSectionHeight(remSec);

            if (currentH + remSecH <= limit) {
              pages[pageIdx].push({
                sec: remSec,
                colIndex: sIdx,
                isSplit: true,
                splitPart: `p${pageIdx + 1}`,
                splitOffset: offset
              });
              currentH += remSecH;
              break;
            } else {
              let nextFit = 0;
              let nextAccum = currentH + 50;
              for (let j = 0; j < remainingItems.length; j++) {
                const itH = estimateItemHeight(sec.type, remainingItems[j]);
                if (nextAccum + itH <= limit) {
                  nextAccum += itH;
                  nextFit++;
                } else {
                  break;
                }
              }

              if (nextFit > 0) {
                pages[pageIdx].push({
                  sec: { ...sec, items: remainingItems.slice(0, nextFit) },
                  colIndex: sIdx,
                  isSplit: true,
                  splitPart: `p${pageIdx + 1}`,
                  splitOffset: offset
                });
                offset += nextFit;
                remainingItems = remainingItems.slice(nextFit);
              } else {
                // If even 1 item didn't fit, push remaining item to brand new page
                pages[pageIdx].push({
                  sec: { ...sec, items: remainingItems.slice(0, 1) },
                  colIndex: sIdx,
                  isSplit: true,
                  splitPart: `p${pageIdx + 1}`,
                  splitOffset: offset
                });
                offset += 1;
                remainingItems = remainingItems.slice(1);
              }

              if (remainingItems.length > 0) {
                pageIdx++;
                pages[pageIdx] = [];
                currentH = 0;
                limit = getLimit(pageIdx);
              }
            }
          }
          continue;
        }
      }

      // Section cannot fit in current page, move to next page
      pageIdx++;
      pages[pageIdx] = [];
      currentH = 0;
      limit = getLimit(pageIdx);

      const freshSecH = estimateSectionHeight(sec);
      if (freshSecH <= limit || !sec.items || sec.items.length <= 1) {
        pages[pageIdx].push({
          sec,
          colIndex: sIdx,
          isSplit: false
        });
        currentH += freshSecH;
      } else {
        // Section is longer than a whole page, split across multiple pages
        let currentItems = sec.items;
        let offset = 0;
        while (currentItems.length > 0) {
          let nextFit = 0;
          let nextAccum = currentH + 50;
          for (let k = 0; k < currentItems.length; k++) {
            const itH = estimateItemHeight(sec.type, currentItems[k]);
            if (nextAccum + itH <= limit) {
              nextAccum += itH;
              nextFit++;
            } else {
              break;
            }
          }

          if (nextFit === 0) nextFit = 1;

          pages[pageIdx].push({
            sec: { ...sec, items: currentItems.slice(0, nextFit) },
            colIndex: sIdx,
            isSplit: true,
            splitPart: `p${pageIdx + 1}`,
            splitOffset: offset
          });

          offset += nextFit;
          currentItems = currentItems.slice(nextFit);

          if (currentItems.length > 0) {
            pageIdx++;
            pages[pageIdx] = [];
            currentH = 0;
            limit = getLimit(pageIdx);
          } else {
            currentH = nextAccum;
          }
        }
      }
    }

    return pages;
  };

  const renderSectionItem = (itemWrapper, column) => {
    const { sec, colIndex, isSplit, splitPart, splitOffset } = itemWrapper;
    const list = column === 'left' ? (resume.leftColumn || []) : (resume.rightColumn || []);
    const props = {
      key: `${sec.id || sec.type}-${colIndex}-${splitPart || 'full'}`,
      section: sec,
      theme,
      onChange: (updated) => handleSectionUpdate(column, colIndex, updated, isSplit, splitPart, splitOffset),
      onDelete: () => handleDeleteSection(column, colIndex),
      onMoveUp: colIndex > 0 ? () => handleMoveSection(column, colIndex, -1) : undefined,
      onMoveDown: colIndex < list.length - 1 ? () => handleMoveSection(column, colIndex, 1) : undefined,
      onSwitchColumn: () => handleSwitchColumn(column, colIndex)
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
  const templateStyle = theme.templateStyle || 'modern-enhancv';
  const isSidebarLayout = templateStyle === 'sidebar-indigo';
  const isDarkBanner = templateStyle === 'dark-banner';
  const isCompactAts = templateStyle === 'compact-ats';

  let gridColsClass = 'grid-cols-12 gap-8';
  let leftSpan = 'col-span-7';
  let rightSpan = 'col-span-5';

  if (theme.columnLayout === '50-50') {
    leftSpan = 'col-span-6';
    rightSpan = 'col-span-6';
  } else if (theme.columnLayout === '60-40') {
    leftSpan = 'col-span-7';
    rightSpan = 'col-span-5';
  } else if (theme.columnLayout === '40-60') {
    leftSpan = 'col-span-5';
    rightSpan = 'col-span-7';
  } else if (theme.columnLayout === 'single') {
    gridColsClass = 'grid-cols-1 gap-6';
    leftSpan = 'col-span-1';
    rightSpan = 'col-span-1';
  }

  // Template container styling
  const getContainerStyle = () => {
    return {
      fontFamily: theme.fontFamily || 'Inter, sans-serif'
    };
  };

  const [zoomScale, setZoomScale] = useState(1);

  // Auto-fit on small phone screens on initial load
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      const calcFit = Math.min(1, Math.max(0.38, (window.innerWidth - 24) / 794));
      setZoomScale(+calcFit.toFixed(2));
    }
  }, []);

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(1.5, +(prev + 0.1).toFixed(2)));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(0.35, +(prev - 0.1).toFixed(2)));
  };

  const handleZoomReset = () => {
    setZoomScale(1);
  };

  const handleFitScreen = () => {
    if (typeof window !== 'undefined') {
      const calcFit = Math.min(1, Math.max(0.38, (window.innerWidth - 24) / 794));
      setZoomScale(+calcFit.toFixed(2));
    } else {
      setZoomScale(0.48);
    }
  };

  const leftPages = paginateColumnMultiPage(resume.leftColumn || [], 710, 880);
  const rightPages = paginateColumnMultiPage(resume.rightColumn || [], 710, 880);
  const totalPages = Math.max(leftPages.length, rightPages.length, 1);

  return (
    <div className="flex flex-col items-center p-2 sm:p-8 overflow-x-auto w-full relative">
      {/* Zoom / Viewport Controller Bar */}
      <div className="sticky top-2 z-30 mb-4 no-print bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-slate-700/80 flex items-center gap-2 select-none">
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoomScale <= 0.4}
          className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleZoomReset}
          className="px-2 py-0.5 text-xs font-mono font-bold text-[#00c598] hover:bg-slate-800 rounded-md transition-colors"
          title="Click to reset to 100%"
        >
          {Math.round(zoomScale * 100)}%
        </button>

        <button
          type="button"
          onClick={handleZoomIn}
          disabled={zoomScale >= 1.5}
          className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-3.5 bg-slate-700 mx-0.5" />

        <button
          type="button"
          onClick={handleFitScreen}
          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
            zoomScale < 0.6
              ? 'bg-[#00c598] text-slate-950 shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Fit Resume to Screen"
        >
          Fit Phone
        </button>

        <button
          type="button"
          onClick={handleZoomReset}
          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
            zoomScale === 1
              ? 'bg-[#00c598] text-slate-950 shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="100% Real A4 Scale"
        >
          100% A4
        </button>
      </div>

      {/* A4 Multi-Page Container */}
      <div
        ref={printRef}
        className="w-full flex flex-col items-center gap-6 overflow-x-auto pb-8"
        style={zoomScale < 1 ? { minHeight: `${297 * zoomScale * 3.78 * totalPages}px` } : {}}
      >
        {Array.from({ length: totalPages }).map((_, pIdx) => {
          const pageNum = pIdx + 1;
          const leftItems = leftPages[pIdx] || [];
          const rightItems = rightPages[pIdx] || [];
          const isFirstPage = pIdx === 0;
          const isLastPage = pIdx === totalPages - 1;

          return (
            <div
              key={`resume-page-${pageNum}`}
              id={`resume-page-${pageNum}`}
              className={`a4-page rounded-sm font-sans transition-all duration-200 ${
                !isFirstPage ? 'mt-2' : ''
              } ${isCompactAts ? 'compact-ats-mode p-6' : ''} ${
                templateStyle === 'executive-classic' || templateStyle === 'academic-serif' ? 'serif-mode' : ''
              }`}
              style={{
                ...getContainerStyle(),
                transform: zoomScale !== 1 ? `scale(${zoomScale})` : undefined,
                transformOrigin: 'top center',
                marginBottom: zoomScale < 1 ? `-${(1 - zoomScale) * 1123}px` : undefined
              }}
            >
              {/* Header Section on Page 1 Only */}
              {isFirstPage && (
                isDarkBanner ? (
                  <div className="bg-slate-900 text-white -mx-8 -mt-8 px-8 pt-8 pb-6 mb-6 rounded-t-sm shadow-sm border-b-4 border-sky-400">
                    <HeaderSection
                      header={resume.header}
                      onChange={handleHeaderChange}
                      theme={{ ...theme, primaryColor: '#38bdf8' }}
                      isDarkHeader={true}
                    />
                  </div>
                ) : (
                  <HeaderSection
                    header={resume.header}
                    onChange={handleHeaderChange}
                    theme={theme}
                  />
                )
              )}

              {/* Page Layout Grid */}
              <div className={`grid ${gridColsClass}`}>
                {/* Left Column */}
                <div
                  className={`${leftSpan} ${
                    isSidebarLayout
                      ? 'bg-indigo-50/60 p-4 rounded-xl border border-indigo-100/80 space-y-2'
                      : ''
                  }`}
                >
                  {leftItems.map((itemWrapper) => renderSectionItem(itemWrapper, 'left'))}

                  {/* + New Section Button (Left) on Last Page */}
                  {isLastPage && (
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
                  )}
                </div>

                {/* Right Column */}
                <div className={rightSpan}>
                  {rightItems.map((itemWrapper) => renderSectionItem(itemWrapper, 'right'))}

                  {/* + New Section Button (Right) on Last Page */}
                  {isLastPage && theme.columnLayout !== 'single' && (
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
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
