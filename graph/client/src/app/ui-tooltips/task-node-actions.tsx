import { TaskNodeTooltipProps } from '@nx/graph/ui-tooltips';
import { useState } from 'react';

export function TaskNodeActions(props: TaskNodeTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const project = props.id.split(':')[0];
  return (
    <div className="overflow-hidden rounded-md border border-slate-200 dark:border-slate-800 w-full">
      <div
        className="flex justify-between items-center w-full bg-slate-50 px-4 py-2 text-xs font-medium uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Inputs</span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▲
        </span>
      </div>
      <ul
        className={`max-h-[300px] divide-y divide-slate-200 overflow-auto dark:divide-slate-800 ${
          !isOpen && 'invisible relative h-0 overflow-hidden p-0 m-0'
        }`}
      >
        {Object.entries(props.inputs ?? {})
          .sort(([a], [b]) => {
            const first = 'general';
            const second = project;
            const last = 'external';

            // Check if 'a' and/or 'b' are one of the special strings
            if (
              a === first ||
              a === second ||
              a === last ||
              b === first ||
              b === second ||
              b === last
            ) {
              // If 'a' is 'general', 'a' should always be first
              if (a === first) return -1;
              // If 'b' is 'general', 'b' should always be first
              if (b === first) return 1;
              // At this point, we know neither 'a' nor 'b' are 'general'
              // If 'a' is 'project', 'a' should be second (i.e., before 'b' unless 'b' is 'general')
              if (a === second) return -1;
              // If 'b' is 'project', 'b' should be second (i.e., before 'a')
              if (b === second) return 1;
              // At this point, we know neither 'a' nor 'b' are 'general' or project
              // If 'a' is 'external', 'a' should be last (i.e., after 'b')
              if (a === last) return 1;
              // If 'b' is 'external', 'b' should be last (i.e., after 'a')
              if (b === last) return -1;
            }

            // If neither 'a' nor 'b' are one of the special strings, sort alphabetically
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          })
          .map(([key, inputs]) => {
            if (key === 'general' || key === project) {
              return renderInputs(inputs);
            }
            if (key === 'external') {
              return InputAccordion({ section: 'External Inputs', inputs });
            }

            return InputAccordion({ section: key, inputs });
          })}
      </ul>
    </div>
  );
}

function InputAccordion({ section, inputs }) {
  const [isOpen, setIsOpen] = useState(false);

  return [
    <li
      key={section}
      className="flex justify-between items-center whitespace-nowrap px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-300"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="block truncate font-normal font-bold">{section}</span>
      <span
        className={`transform transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
      >
        ▲
      </span>
    </li>,
    isOpen ? renderInputs(inputs) : undefined,
  ];
}

function renderInputs(inputs: string[]) {
  return inputs.map((input) => (
    <li
      key={input}
      className="whitespace-nowrap px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-300"
    >
      <span className="block truncate font-normal">{input}</span>
    </li>
  ));
}
