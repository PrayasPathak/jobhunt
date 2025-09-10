import { Combobox, useCombobox } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { useState } from "react";

const opt = [
  "Relevance",
  "Most Recent",
  "Salary (Low to High)",
  "Salary (High to Low)",
];

export default function Sort() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [selectedItem, setSelectedItem] = useState<string | null>("Relevance");

  const options = opt.map((item) => (
    <Combobox.Option value={item} key={item} className="text-xs cursor-pointer">
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      width={150}
      store={combobox}
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <div
          className="border border-bright-sun-400 flex gap-2 text-sm items-center px-2 py-1 rounded-xl cursor-pointer"
          onClick={() => combobox.toggleDropdown()}
        >
          {selectedItem}
          <IconAdjustments className="text-bright-sun-400 h-5 w-5" />
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
