import React from 'react';

export default function RatingDots({ rating = 4, max = 5, onChange, color = '#00c598', readOnly = false }) {
  return (
    <div className="inline-flex items-center gap-1.5 py-0.5" title={`${rating}/${max}`}>
      {Array.from({ length: max }).map((_, i) => {
        const isFilled = i < rating;
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={() => onChange && onChange(i + 1)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-150 ${
              isFilled ? 'scale-100' : 'scale-90 bg-slate-200'
            } ${!readOnly ? 'hover:scale-125 cursor-pointer' : ''}`}
            style={{
              backgroundColor: isFilled ? color : '#e2e8f0'
            }}
          />
        );
      })}
    </div>
  );
}
