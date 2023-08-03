import { TaskNodeTooltipProps } from '@nx/graph/ui-tooltips';
import { useState } from 'react';

export function TaskNodeActions(props: TaskNodeTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="overflow-hidden rounded-md border border-slate-200 dark:border-slate-800 w-full"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center w-full bg-slate-50 px-4 py-2 text-xs font-medium uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
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
        {Object.entries(props.inputs ?? {}).map(([key, inputs]) => {
          return inputs.map((input) => (
            <li
              key={input}
              className="whitespace-nowrap px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-300"
            >
              <span className="block truncate font-normal">{input}</span>
            </li>
          ));
        })}
      </ul>
    </div>
  );
}
