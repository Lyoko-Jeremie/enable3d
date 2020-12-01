import { Scene3D, ExtendedObject3D, THREE } from '@enable3d/phaser-extension'
import { ClosestRaycaster, AllHitsRaycaster } from '@enable3d/ammo-physics'
import { TextureLoader } from '../../../common/node_modules/@enable3d/three-wrapper/dist'

export default class MainScene extends Scene3D {
  constructor() {
    super({ key: 'MainScene' })
  }

  init() {
    this.accessThirdDimension({ enableXR: false, antialias: false })
  }

  create() {
    this.third.warpSpeed()

    this.third.physics?.debug?.enable()

    let wrapper = new ExtendedObject3D()
    wrapper.name = 'wrapper'
    wrapper.position.set(0, 10, 0)
    wrapper.rotation.x = -Math.PI / 3
    let geo = new THREE.BoxBufferGeometry(10, 10, 10) // does only work with buffer geometry
    let mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial())
    wrapper.add(mesh)
    this.third.add.existing(wrapper)

    wrapper.traverse(child_ => {
      let child = child_ as ExtendedObject3D
      if (child instanceof THREE.Mesh) {
        this.third.physics.add.existing(child, {
          shape: 'concave',
          mass: 0,
          collisionFlags: 1,
          autoCenter: false
        })
      }
    })
  }

  update() {}
}
