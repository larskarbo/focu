export default class Timer {
  constructor(ms) {
    if (!ms) {
      throw new Error('you need to supply a duration!')
    }
    this.duration = ms
    this.progressFn = () => {}
    this.finishFn = () => {}

    let intTime = 50
    let i = 0
    this.startTime = new Date()
    this.int = setInterval(() => {
			if(this.paused){
				return
			}
      const progress = (new Date() - this.startTime) / this.duration
      this.progressFn(progress, (new Date() - this.startTime))
      if (progress >= 1) {
        clearInterval(this.int)

        this.progressFn(1)
        this.finishFn()
      }
      i++
    }, intTime)

    return this
  }

  progress(fn) {
    this.progressFn = fn
    return this
  }

  finish(fn) {
    this.finishFn = fn
    return this
	}

	pause() {
		this.paused = true
		this.pausedTime = new Date()
	}

	resume() {
		var lostTime = new Date() - this.pausedTime
		this.startTime = new Date(this.startTime.getTime() + lostTime)
		this.paused = false
	}

  cancel() {
    clearInterval(this.int)
  }
}
