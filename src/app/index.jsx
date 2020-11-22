import React, { useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { Container, Dropdown, Segment, Input, Hr, Title, Textarea } from 'components'

export default function App() {
	const [theme, setTheme] = useLocalStorage('theme', 'light')
	const [fontSize, setFontSize] = useLocalStorage('fontSize', 'medium')
	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
	const toggleFontSize = fontSize => setFontSize(fontSize)
  return (
		<div id="app" className={`${theme}-theme ${fontSize}`}>
			<Container>
				<div onClick={toggleTheme}>{theme}</div>
				<Segment>
					<Title label='Font Size' />
					<Hr />
					<div onClick={() => toggleFontSize('large')}>large</div>
					<div onClick={() => toggleFontSize('big')}>big</div>
					<div onClick={() => toggleFontSize('medium')}>meidum</div>
					<div onClick={() => toggleFontSize('small')}>small</div>
					<div onClick={() => toggleFontSize('tiny')}>tiny</div>
				</Segment>
				<Segment>
					<Title label='Input' />
					<Hr />
					<Input
						required
						autoFocus
						label="Username"
						defaultValue={"Jherk"}
						placeholder="Please enter username..."
					/>
					<Input
						label="Password"
						type='password'
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
						options={[{ value: 'FAB12', text: 'FAB12' }, { value: 'FAB12B', text: 'FAB12B' }, ]}
					/>
				</Segment>
			</Container>
		</div>
	);
}
