import { Combobox, InputBase, ScrollArea, useCombobox } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Icon, IconProps } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface Props {
  label: string;
  placeholder: string;
  options: string[];
  leftSection: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<Icon>
  >;
  value: string;
  name: string;
  form: UseFormReturnType<any>;
}

export function SelectInput(props: Props) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setData(props.options);
    setValue(props.form.getInputProps(props.name).value);
    setSearch(props.form.getInputProps(props.name).value);
  }, []);

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) =>
        item.toLowerCase().includes(search?.toLowerCase()?.trim())
      );

  const opts = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === "$create") {
          setData((current) => [...current, search]);
          setValue(search);
          props.form.setFieldValue(props.name, search);
        } else {
          setValue(val);
          setSearch(val);
          props.form.setFieldValue(props.name, val);
        }

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          {...props.form.getInputProps(props.name)}
          leftSection={<props.leftSection stroke={1.5} />}
          withAsterisk
          label={props.label}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || "");
          }}
          placeholder={props.placeholder}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {opts}
            {!exactOptionMatch && search?.trim()?.length > 0 && (
              <Combobox.Option value="$create">
                + Create {search}
              </Combobox.Option>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
