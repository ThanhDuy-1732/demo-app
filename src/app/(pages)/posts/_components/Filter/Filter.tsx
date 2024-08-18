'use client';
import { Button, Form, Select } from "antd";
import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { OrderEnum, SearchPosts } from "../../_services/post.api";
import { SearchOutlined } from '@ant-design/icons';
import usePostStore from "../../_services/post.store";

export type Options = {
  value: string,
  label: string,
}

export type FormValues = {
  sortBy: string,
  order: OrderEnum,
}

export type FilterProps = {
  search: (sortBy: string, order: OrderEnum) => void;
}

const Filter: React.FC<PropsWithChildren<FilterProps>> = ({ search }) => {
  const filter: SearchPosts = usePostStore((state) => state.filter);
  const [form] = Form.useForm();
  const values: FormValues = Form.useWatch([], form);

  const initValues: FormValues = useMemo(() => ({ sortBy: filter.sortBy || '', order: filter.order || OrderEnum.ASC  }), [filter]);

  useEffect(() => {
    form.setFieldValue('sortBy', filter.sortBy);
    form.setFieldValue('order', filter.order || OrderEnum.ASC);
  }, [filter, form]);

  const handleSearchClick = useCallback(() => {
    search(values.sortBy, values.order);
  }, [values, search])

  const optionsFilter: Array<Options> = [
    {
      value: "id", label: "ID",
    },
    {
      value: "title", label: "Title",
    },
    {
      value: "userId", label: "User ID",
    },
  ];

  const optionsOrder: Array<Options> = [
    {
      value: OrderEnum.ASC, label: 'A->Z',
    },
    {
      value: OrderEnum.DESC, label: 'Z->A',
    }
  ]

  return (
    <>
      <Form
        form={form}
        name='filter'
        className="flex gap-2 mx-2"
        initialValues={initValues}
        onFinish={handleSearchClick}
      >
        <Form.Item name="sortBy">
          <Select
            showSearch
            allowClear
            style={{ width: '200px' }}
            placeholder="Select type"
            options={optionsFilter}
          />
        </Form.Item>
        <Form.Item name="order">
          <Select 
            showSearch
            allowClear
            defaultValue={OrderEnum.ASC}
            style={{ width: '100px' }}
            options={optionsOrder}
          />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} shape="circle" htmlType="submit" />
        </Form.Item>
      </Form>
    </>
  )
}

export default Filter;