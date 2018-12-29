import { eventMixin } from '../core/event'
import { Vector3 } from '../libs/threejs'

class Overlay {
    constructor() {
        const position = new Vector3()
        Object.defineProperty(this, 'worldPosition', {
            enumerable: true,
            configurable: true,
            get: function() {
                let ret = undefined
                if (this.object3D && this.object3D.parent) {
                    if (this.object3D.isSprite || this.object3D.isPoints) {
                        ret = this.object3D.parent.localToWorld(position.copy(this.object3D.position))
                    } else if (this.object3D.geometry) {
                        this.object3D.geometry.computeBoundingBox()
                        ret = this.object3D.geometry.boundingBox.getCenter(position)
                    }
                }
                return ret
            },
        })
    }

    show() {
        this.visible = true
    }

    hide() {
        this.visible = false
    }

    removeFromParent() {
        if (this.object3D && this.object3D.parent) {
            this.object3D.parent.remove(this.object3D)
        }
    }
}

eventMixin(Overlay)

Object.defineProperties(Overlay.prototype, {
    visible: {
        enumerable: true,
        configurable: false,
        get: function() {
            return this.object3D && this.object3D.visible
        },
        set: function(value) {
            this.object3D && (this.object3D.visible = value)
        },
    },

    isOverlay: {
        configurable: false,
        value: true,
        writable: false,
    },
})

export default Overlay
