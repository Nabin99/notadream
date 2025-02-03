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
        {({ open }) => {
          if (open) {
            document.documentElement.style.removeProperty("overflow");
            document.documentElement.style.removeProperty("padding-right");
          }

          return (
            <div>
              <ListboxButton
                className="listbox-button"
                aria-label="listbox-button"
              >
                <span>{selected?.[renderKey]}</span>
                <span className={`icon ${open ? "rotate" : ""}`.trimEnd()}>
                  {buttonIcon}
                </span>
              </ListboxButton>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions
                  className="listbox-options"
                  aria-label="listbox-options"
                >
                  {data.map((dataObject) => (
                    <ListboxOption
                      key={dataObject?.id}
                      value={dataObject}
                      aria-label="listbox-option"
                    >
                      {({ selected }) => (
                        <div
                          className={`listbox-option ${selected ? "selected" : ""}`.trimEnd()}
                        >
                          {selected && (
                            <HiCheck
                              className="check-icon"
                              aria-hidden="true"
                            />
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
            </div>
          );
        }}
      </HeadlessListbox>
    </div>
  );
};
