import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { renderSlideContent } from '../../components/slide_config';
import { Slide } from '../../types/slide';
import { useState } from 'react';

interface SortableSlideProps {
    slide: Slide;
    index: number;
    selectedSlide: number;
    onSlideClick: (index: number) => void;
}

export function SortableSlide({ slide, index, selectedSlide, onSlideClick }: SortableSlideProps) {
    const [mouseDownTime, setMouseDownTime] = useState(0);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: slide.id! });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };

    const handleMouseDown = () => {
        setMouseDownTime(Date.now());
    };

    const handleMouseUp = () => {
        const mouseUpTime = Date.now();
        const timeDiff = mouseUpTime - mouseDownTime;

        // If the mouse was down for less than 200ms, consider it a click
        if (timeDiff < 200 && !isDragging) {
            onSlideClick(slide.index);
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className={` cursor-pointer border-[3px] p-1 shadow-lg   rounded-md transition-all duration-200 ${selectedSlide === index ? ' border-[#5141e5]' : 'border-color'
                }`}
        >
            <div className=" slide-box relative overflow-hidden aspect-video">
                <div className="absolute bg-transparent z-40 top-0 left-0 w-full h-full" />
                <div className="transform scale-[0.2] flex justify-center items-center origin-top-left  w-[500%] h-[500%]">
                    {renderSlideContent(slide, 'English')}
                </div>
            </div>
        </div>
    );
} 