import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import {
  Button,
  Checkbox,
  Container,
  Dropdown,
  Grid,
  Hr,
  Input,
  Row,
  Segment,
  TabBar,
  Textarea,
  Title,
} from 'components';

const preSimulationRequestList = [
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/03 09:28:32',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    requestId: 'NTO_20202',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/03 09:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/04 09:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/03 09:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/13 09:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2022/01/03 09:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/03 09:38:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/03 09:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/11/03 09:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2021/01/03 09:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/03 09:28:08',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/03 19:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/03 09:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/01 09:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/03 09:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
  {
    select: false,
    createUser: 'WCFANGC',
    submitDt: '2020/01/02 09:28:34',
    tech: 'N05',
    fromOpeNo: '0000.000',
    toOpeNo: '9000.000',
    remark: '',
    option1: 'op1',
    option2: 'op2',
    option3: 'op3',
    option4: 'op4',
    option5: 'op5',
    option6: 'op6',
    option7: 'op7',
    option8: 'op8',
    option9: 'op9',
    requestId: 'NTO_20202',
  },
];

const simulationRequestHeaderList = [
  'createUser',
  'submitDt',
  'tech',
  'fromOpeNo',
  'toOpeNo',
  'remark',
  'requestId',
  'option2',
  'option3',
  'option4',
  'option5',
  'option6',
  'option7',
  'option8',
  'option9',
];

export default function App() {
  const [username, setUsername] = useState('Jherk');
  const [checked, setChecked] = useState(false);
  const [simulationRequestList, setSimulationRequestList] = useState(preSimulationRequestList);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [activeTab, setActiveTab] = useLocalStorage('tab', 'BookingSimulation');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 'medium');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleFontSize = (fontSize) => setFontSize(fontSize);
  const onSelect = (data) => setSimulationRequestList(data);
  return (
    <div id="app" className={`${theme}-theme ${fontSize}`}>
      <TabBar
        activeTab={activeTab}
        onTabClick={setActiveTab}
        data={[
          {
            label: 'Booking Simulation',
            key: 'BookingSimulation',
          },
          {
            label: 'Apply MPCS',
            key: 'ApplyMPCS',
          },
          {
            label: 'History',
            key: 'History',
            disabled: true,
          },
        ]}
      />
      <Container>
        <Button onClick={toggleTheme} label="theme" />
        <Segment>
          <Title label="Font Size" />
          <Hr />
          <Button onClick={() => toggleFontSize('large')} label="large" />
          <Button onClick={() => toggleFontSize('big')} label="big" />
          <Button onClick={() => toggleFontSize('medium')} label="medium" />
          <Button onClick={() => toggleFontSize('small')} label="small" />
          <Button onClick={() => toggleFontSize('tiny')} label="tiny" />
        </Segment>
        <Segment>
          <Checkbox
            checked={checked}
            onChange={setChecked}
            label="Check this."
          />
        </Segment>
        <Segment>
          <Grid
            selectable
            filterable
            data={simulationRequestList}
            headerList={simulationRequestHeaderList}
            onSelect={onSelect}
          />
        </Segment>
        <Segment>
          <Title label="Input" />
          <Hr />
          <Input
            required
            keyboardType="number"
            label="Username"
            value={username}
            onChange={setUsername}
            placeholder="Please enter username..."
          />
          <Row>
            <Input
              required
              sm={6}
              label="Part6"
              value="Part6"
              placeholder="Please enter part6..."
            />
            <Input
              required
              sm={6}
              label="Part Prefix"
              value="TMNK01"
              placeholder="Please enter Part Prefix..."
            />
          </Row>
          <Row>
            <Input
              required
              sm={4}
              label="Handbook"
              value="Handbook"
              placeholder="Please enter Handbook..."
            />
            <Input
              required
              sm={4}
              label="Tech"
              value="N05"
              placeholder="Please enter Tech..."
            />
            <Input
              required
              sm={4}
              autoFocus
              label="Golden Profile"
              value="MNGU96"
              placeholder="Please enter Golden Profile..."
            />
          </Row>
          <Row>
            <Input
              label="Address"
              value=""
              placeholder="Please enter placeholder..."
            />
            <Button color="tint" label="Query" />
          </Row>
          <Input
            label="Password"
            type="password"
            placeholder="Please enter password..."
          />
          <Textarea
            label="Description"
            rows={5}
            placeholder="Please enter description..."
          />
          <Dropdown
            required
            label="Fabs"
            placeholder="Please select a fab..."
            options={[
              { value: 'FAB12', text: 'FAB12' },
              { value: 'FAB12B', text: 'FAB12B' },
            ]}
          />
        </Segment>
        <Segment>
          <Button color="red" label="Cancel" onClik={() => {}} />
          <Button color="orange" label="更新" />
          <Button color="yellow" label="Order" />
          <Button color="green" label="Confirm" />
          <Button disabled color="tint" label="Query" onClik={() => {}} />
          <Button color="blue" label="資訊" onClik={() => {}} />
          <Button outline color="red" label="刪除" onClik={() => {}} />
          <Button outline color="blue" label="Option1" onClik={() => {}} />
          <Button disabled color="blue" label="Option2" onClik={() => {}} />
          <Button
            disabled
            outline
            color="red"
            label="Option3"
            onClik={() => {}}
          />
        </Segment>
      </Container>
    </div>
  );
}
