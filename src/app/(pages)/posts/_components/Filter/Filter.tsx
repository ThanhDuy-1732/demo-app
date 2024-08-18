'use client';
// Utilities
import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";

// Components
import { Button, Form, Select } from "antd";
import { SearchOutlined } from '@ant-design/icons';

// APIs
import { OrderEnum, SearchPosts } from "../../_services/post.api";

// Stores
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
  const [form] = Form.useForm();
  const values: FormValues = Form.useWatch([], form);
  const filter: SearchPosts = usePostStore((state) => state.filter);
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
        initialValues={initValues}
        className="flex gap-2 mx-2"
        onFinish={handleSearchClick}
      >
        <Form.Item name="sortBy">
          <Select
            showSearch
            allowClear
            options={optionsFilter}
            placeholder="Select type"
            style={{ width: '200px' }}
          />
        </Form.Item>
        <Form.Item name="order">
          <Select 
            showSearch
            allowClear
            options={optionsOrder}
            style={{ width: '100px' }}
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