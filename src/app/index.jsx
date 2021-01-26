import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import {
  Button,
  Container,
  Dropdown,
  Segment,
  Input,
  Hr,
  Row,
  Title,
  Textarea,
} from 'components';

export default function App() {
  const [username, setUsername] = useState('Jherk');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 'medium');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleFontSize = (fontSize) => setFontSize(fontSize);
  return (
    <div id="app" className={`${theme}-theme ${fontSize}`}>
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
            <Button
              color="tint"
              label="Query"
            />
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
