import { Camera } from './types';

export const cameraSet: { [key in string]: Camera } = {
	camera1: {
		name: 'white',
		position: [-10,0,0],
		//target: [5, 0, 0]
	},
	camera2: {
		name: 'green',
		position: [10,0,0],
		//target: [-5,0,0]
	},
    camera3: {
		name: 'blue',
		position: [0,-10,0],
		//target: [0,5,0]
	},
    camera4: {
		name: 'yellow',
		position: [0,10,0],
		//target: [0,-5,0]
	},
    camera5: {
		name: 'cyan',
		position: [0,0,-10],
		//target: [0,0,5]
	},
    camera6: {
		name: 'magenta',
		position: [0,0,10],
		//target: [0,0,-5]
	},
}