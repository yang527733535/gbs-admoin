import React, { useRef, useEffect, useState } from 'react';
import {
  Form,
  AutoComplete,
  Input,
  Select,
  TreeSelect,
  Button,
  Checkbox,
  Switch,
  Radio,
  Cascader,
  Message,
  InputNumber,
  Rate,
  Slider,
  Upload,
  DatePicker,
  Modal,
} from '@arco-design/web-react';
import { addDrama, addShop } from '../../../api/drama.js';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
};
const noLabelLayout = {
  wrapperCol: {
    span: 17,
    offset: 7,
  },
};

function Shop({ closeModalAndReqTable }) {
  const formRef = useRef();
  const [size, setSize] = useState('default');

  useEffect(() => {
    // formRef.current.setFieldsValue({ rate: 5 });
  }, []);

  const onValuesChange = (changeValue, values) => {
    console.log('onValuesChange: ', changeValue, values);
  };

  return (
    <div style={{ maxWidth: 650 }}>
      <Form
        ref={formRef}
        {...formItemLayout}
        size={size}
        // initialValues={{
        //   slider: 20,
        //   'a.b[0].c': ['b'],
        // }}
        onSubmit={(e) => {
          console.log(e);
        }}
        onValuesChange={onValuesChange}
        scrollToFirstError
      >
        <FormItem
          label="店铺名称"
          field="store_name"
          rules={[{ required: true, message: '请填写店铺名称' }]}
        >
          <Input placeholder="请填写店铺名称..." />
        </FormItem>
        <FormItem
          label="省份"
          field="position_state"
          rules={[{ required: false, message: '请填写省份' }]}
        >
          <Input placeholder="请填写省份..." />
        </FormItem>
        <FormItem
          label="城市"
          field="position_city"
          rules={[{ required: false, message: '请填写城市' }]}
        >
          <Input placeholder="请填写城市..." />
        </FormItem>
        <FormItem
          label="县区"
          field="position_district"
          rules={[{ required: false, message: '请填写县区' }]}
        >
          <Input placeholder="请填写县区..." />
        </FormItem>
        <FormItem
          label="门店类型"
          field="store_type"
          rules={[{ required: false, message: '请填写门店类型' }]}
        >
          <Input placeholder="请填写门店类型..." />
        </FormItem>
        <FormItem
          label="门店级别"
          field="store_level"
          rules={[{ required: false, message: '请填写门店级别' }]}
        >
          <Input placeholder="请填写门店级别..." />
        </FormItem>
        <FormItem
          label="开业日期"
          field="open_date"
          rules={[
            {
              required: true,
              message: 'open_date is required',
            },
          ]}
        >
          <DatePicker showTime />
        </FormItem>

        <FormItem
          label="详细地址"
          field="position_address"
          rules={[{ required: true, message: '请填写详细地址' }]}
        >
          <Input placeholder="请填写详细地址..." />
        </FormItem>
        <FormItem
          label="经度坐标"
          field="position_x"
          rules={[{ required: false, message: '请填写经度坐标' }]}
        >
          <Input placeholder="请填写经度坐标..." />
        </FormItem>
        <FormItem
          label="纬度坐标"
          field="position_y"
          rules={[{ required: false, message: '请填写纬度坐标' }]}
        >
          <Input placeholder="请填写纬度坐标..." />
        </FormItem>

        <FormItem {...noLabelLayout}>
          <Button
            onClick={async () => {
              if (formRef.current) {
                try {
                  await formRef.current.validate();
                  // Message.info('校验通过，提交成功！');
                  const data = await addShop(formRef.current.getFields());
                  console.log('data: ', data);
                  if (data.code === 200) {
                    Message.success('添加成功');
                    closeModalAndReqTable();
                  }
                } catch (_) {
                  console.log(formRef.current.getFieldsError());
                  Message.error('校验失败，请检查字段！');
                }
              }
            }}
            type="primary"
            style={{ marginRight: 24 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              formRef.current.resetFields();
            }}
          >
            Reset
          </Button>
          {/* <Button
            type="text"
            onClick={() => {
              Message.info(`fields: ${formRef.current.getTouchedFields().join(',')}`);
            }}
          >
            Get touched fields
          </Button> */}
        </FormItem>
      </Form>
    </div>
  );
}

export default Shop;
