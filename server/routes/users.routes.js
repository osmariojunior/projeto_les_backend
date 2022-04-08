const { Router } = require('express')

const router = new Router()

router.get('/login', (req, res) => {
    res.send('mocked login')
})

module.exports = router