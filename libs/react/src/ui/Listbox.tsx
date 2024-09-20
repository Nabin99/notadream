import {
  Listbox as HeadlessListbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { HiChevronDown, HiCheck } from "react-icons/hi";

import type { ListboxProperties } from "./type";

export const Listbox: React.FC<ListboxProperties> = ({
  data,
  selected,
  setSelected,
  renderKey = "name",
  buttonIcon = <HiChevronDown aria-hidden="true" />, // Default icon
}) => {
  return (
    <div className="listbox-container">
      <HeadlessListbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <ListboxButton className="listbox-button">
              <span>{selected?.[renderKey]}</span>
              <span className={`icon ${open ? "rotate" : ""}`}>
                {buttonIcon}
              </span>
            </ListboxButton>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="listbox-options">
                {data.map((dataObject) => (
                  <ListboxOption key={dataObject?.id} value={dataObject}>
                    {({ selected }) => (
                      <div
                        className={`listbox-option ${selected ? "selected" : ""}`}
                      >
                        {selected && (
                          <HiCheck className="check-icon" aria-hidden="true" />
                        )}
                        <span className="option-text">
                          {dataObject?.[renderKey]}
                        </span>
                      </div>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </>
        )}
      </HeadlessListbox>
    </div>
  );
};
