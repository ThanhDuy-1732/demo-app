import { GetProps, Input } from "antd";
import { PropsWithChildren, useCallback } from "react";

type InputSearchProps = {
  defaultValue?: string,
  submit: (search: string) => Promise<void>,
}

type SearchProps = GetProps<typeof Input.Search>;

const InputSearch: React.FC<PropsWithChildren<InputSearchProps>> = ({ submit, defaultValue }) => {
  const handleSearch: SearchProps['onSearch'] = useCallback((value: string, _e: any, info: any) => {
    submit(value.trim());
  }, [submit]);

  return (
    <>
      <Input.Search placeholder="Search content..." onSearch={handleSearch} defaultValue={defaultValue} />
    </>
  )
}

export default InputSearch;