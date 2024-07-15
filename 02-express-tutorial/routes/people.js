const express = require('express');
const router = express.Router();

const {
    getPeople,
    getPerson,
    addPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
} = require('../controllers/people');

/*
router.get('/', getPeople);
router.post('/', createPerson);
router.post('/postman', createPersonPostman); 
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);
*/

// alternatively, we can chain the methods together for similar routes/paths
router.route('/').get(getPeople);
router.route('/').post(addPerson); 

router.route('/:id').get(getPerson);
router.route('/:id').put(updatePerson).delete(deletePerson); //all PUT and DELETE requests to /api/people/:id will be handled by these two methods

router.route('/postman').post(createPersonPostman); //all POST requests to /api/people/postman will be handled by this method

module.exports = router;