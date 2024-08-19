// Utilities
import { PropsWithChildren, useCallback, useState } from "react";

// Components
import { AutoComplete, AutoCompleteProps, GetProps, Input } from "antd";

type InputSearchProps = {
  defaultValue?: string,
  submit: (search: string) => Promise<void>,
  searchOption: (keyword: string) => Promise<Array<string>>
}

type SearchProps = GetProps<typeof Input.Search>;

const InputSearch: React.FC<PropsWithChildren<InputSearchProps>> = ({ submit, defaultValue, searchOption }) => {
  const [timer, setTimer] = useState<any>(null);
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const handleSearchOption = useCallback(async (value: string) => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(() => setTimeout(async () => {
      const result = await searchOption(value);
      const optionsData = result.map(item => ({ value: item, label: item }));
      setOptions([
        {
          value: '',
          label: '--All data--',
        },
        ...optionsData
      ]);
    }, 300));
  }, [searchOption, timer]);

  const handleSearch: SearchProps['onSearch'] = useCallback((value: string, event: any, info: any) => {
    if (event.code === 'Enter') {
      handleSearchOption(value);
      return;
    };

    submit(value.trim());
  }, [handleSearchOption, submit]);

  const handleSelectClick = useCallback((value: string) => {
    submit(value.trim());
  }, [submit]);

  return (
    <>
      <AutoComplete
        options={options}
        style={{ width: '100%' }}
        defaultValue={defaultValue}
        onSelect={handleSelectClick}
        onSearch={handleSearchOption}
      >
        <Input.Search placeholder="Search content..." defaultValue={defaultValue} enterButton onSearch={handleSearch} />
      </AutoComplete>
    </>
  )
}

export default InputSearch;