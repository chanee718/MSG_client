export type Camera = {
	name: string
	position: [number, number, number]
	//target: [number, number, number]
}

export type SceneState = {
	lightProgress: number
	hoveredFigure: boolean
	camera: Camera
	isMoving: boolean
	//cameraTargetProgress: THREE.Vector3
}