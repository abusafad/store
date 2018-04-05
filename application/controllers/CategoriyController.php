<?php

class CategoriyController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function categoriyAction()
    {
        $Categories = new Application_Model_DbTable_Categories();
        $this->view->categoriy = $Categories->fetchAll();
    }

    public function addAction()
    {
        $this->_helper->layout()->disableLayout();

        if ($this->getRequest()->isPost()) {
            $formData = $this->getRequest()->getPost();

            $name = $this->getRequest()->getPost('name');

            $Categories = new Application_Model_DbTable_Categories();
            $Categories->addCategoriy($name);

        }

    }

    public function editAction()
    {

        $this->_helper->layout()->disableLayout();

        if ($this->getRequest()->isPost()) {
            $formData = $this->getRequest()->getPost();

            $id = (int) $this->getRequest()->getPost('id');
            $name = $this->getRequest()->getPost('name');

            $categories = new Application_Model_DbTable_Categories();
            $categories->updateCategoriy($id, $name);

        }

    }

    public function deleteAction()
    {

        $this->_helper->layout()->disableLayout();

        if ($this->getRequest()->isPost()) {
            $del = $this->getRequest()->getPost('del');
            $id = $this->getRequest()->getPost('id');
            $categories = new Application_Model_DbTable_Categories();
            $categories->deleteCategoriy($id);

            $this->_helper->redirector('categoriy');
        } else {
            $id = $this->_getParam('id', 0);
            $categories = new Application_Model_DbTable_Categories();
            $this->view->categoriy = $categories->getCategoriy($id);
        }
    }

    public function categoryjsonAction()
    {
        $this->_helper->layout()->disableLayout();

        $this->_helper->viewRenderer->setNoRender(true);
        $Categories = new Application_Model_DbTable_Categories();

        
        $colums = array
        (
        0 => 'id',
        1 => 'name',

        );

$query = $Categories
    ->select()
    ->where('name LIKE ?',$this->getRequest()->get('search')['value'] . '%');

if (!empty($this->getRequest()->get('search')['value'])) {
    //$queryTot = $index->fetchAll($where = "name LIKE  '" . $_REQUEST['search']['value'] . "%'" );

    $row = $Categories->fetchAll($query);

    $totalRecords = count($row);
} else {

    $row =$Categories->fetchAll($where = null, $order = $colums[$this->getRequest()->get('order')[0]['column']] . " " . $this->getRequest()->get('order')[0]['dir'], $count = $this->getRequest()->get('length'), $offset = $this->getRequest()->get('start'));
    $row2 = $Categories->fetchAll($where = null);

    $totalRecords = count($row2);
    $totalRecords;
}

$json_data = array(
    "draw" => intval($this->getRequest()->get('draw')),
    "recordsTotal" => intval($totalRecords),
    "recordsFiltered" => intval($totalRecords),
    "data" => $row->toArray(),
);

echo json_encode($json_data);


    }

}
