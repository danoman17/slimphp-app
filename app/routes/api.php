<?php

// All the API Routes go below


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

include __DIR__ . '/../middlewares/jsonBodyParser.php';
include __DIR__ . '/../middlewares/authentication.php';

// 1. Auth
$app->post('/autenticacion', function (Request $request, Response $response) {

    $parsedBody = $request->getParsedBody();
    $queryBuilder = $this->get('DB')->getQueryBuilder();

    if (!$parsedBody['usuario'] || !$parsedBody['clave']) {

        $msg = [
            'msg' => 'Introduzca usuario o contrasenia'
        ];
        $response->getBody()->write(json_encode($msg));
        return $response
                ->withHeader('content-type', 'application/json');

    }

    $queryBuilder
        ->select('hash', 'type', 'username')
        ->from('usuario')
        ->where('username = ?')
        ->setParameter(1, $parsedBody['usuario'])
    ;

    $result = $queryBuilder->executeQuery()->fetchAssociative();

    if (!$result) {

        $msg = [
            'msg' => 'Usuario no existe'
        ];
        $response->getBody()->write(json_encode($msg));
        return $response->withHeader('content-type', 'application/json');

    }

    if (array_key_exists('hash', $result)) {
        $hashedPassword = $result['hash'];
    } else {
        $msg = [
            'msg' => 'Usuario no existe'
        ];
        $response->getBody()->write(json_encode($msg));
        return $response->withHeader('content-type', 'application/json');
    }

    if (!password_verify($parsedBody['clave'], $hashedPassword)) {
        $msg = [
            'msg' => 'Error en credenciales'
        ];
        $response->getBody()->write(json_encode($msg));
        return $response->withHeader('content-type', 'application/json');
    }

    $array_response = [
        'msg' => 'Acceso autorizado',
        'data' => [$result['username'],$result['type']]
    ];

    $response->getBody()->write(json_encode($array_response));

    return $response->withHeader('content-type', 'application/json')
                    ->withHeader('Access-Control-Allow-Origin','*');

});



// 2. Get a product by its type
$app->get('/productos/{type}', function (Request $request, Response $response, array $args) {

    // we connect to de DB 
    // we're using the Doctrine DBAL for this:
    $queryBuilder = $this->get('DB')->getQueryBuilder();

    $queryBuilder
        ->select('isbn', 'nombre', 'tipo')
        ->from('Productos')
        ->where('tipo=?')
        ->setParameter(1, $args['type'])
    ;

    $results = $queryBuilder->executeQuery()->fetchAllAssociative();

    $response->getBody()->write(json_encode($results));

    return $response->withHeader('content-type', 'application/json')
                    ->withHeader('Access-Control-Allow-Origin','*');;

});

// 3. Get a product's detail list by its ISBN  
$app->get('/detalles/{isbn}', function (Request $request, Response $response, array $args) {

    // we connect to de DB 
    // we're using the Doctrine DBAL for this:
    $queryBuilder = $this->get('DB')->getQueryBuilder();

    $queryBuilder
        ->select('isbn', 'nombre', 'autor', 'editorial', 'fechaPublicacion', 'precio', 'descuento')
        ->from('Productos')
        ->where('isbn=?')
        ->setParameter(1, $args['isbn'])
    ;

    $results = $queryBuilder->executeQuery()->fetchAssociative();

    $response->getBody()->write(json_encode($results));

    return $response->withHeader('content-type', 'application/json')
                                ->withHeader('Access-Control-Allow-Origin','*');

});

// 4. Add a new product and its details
$app->post('/producto/{category}', function (Request $request, Response $response, array $args) {

    $parsedBody = $request->getParsedBody();
    $queryBuilder = $this->get('DB')->getQueryBuilder();

    // Primera consulta de inserción en 'Productos'
    $queryBuilder
        ->insert('Productos')
        ->setValue('isbn', '?')
        ->setValue('nombre', '?')
        ->setValue('tipo', '?')
        ->setValue('autor', '?')
        ->setValue('editorial', '?')
        ->setValue('fechaPublicacion', '?')
        ->setValue('precio', '?')
        ->setValue('descuento', '?')
        ->setParameter(1, $parsedBody['isbn'])
        ->setParameter(2, $parsedBody['nombre'])
        ->setParameter(3, $args['category'])
        ->setParameter(4, $parsedBody['autor'])
        ->setParameter(5, $parsedBody['editorial'])
        ->setParameter(6, $parsedBody['fechaPublicacion'])
        ->setParameter(7, $parsedBody['precio'])
        ->setParameter(8, $parsedBody['descuento'])
    ;

    $queryBuilder->executeQuery();


    // Respuesta
    $results = $parsedBody['fechaPublicacion'];
    $response->getBody()->write(json_encode($results));
    return $response->withHeader('content-type', 'application/json')
                    ->withHeader('Access-Control-Allow-Origin','*');

})->add($jsonBodyParser);



// 5. Update product details by its ISBN

$app->put('/producto/detalles/{isbn}', function (Request $request, Response $response, array $args) {


    $parsedBody = $request->getParsedBody();
    $queryBuilder = $this->get('DB')->getQueryBuilder();

    $queryBuilder
        ->update('Productos')
        ->set('nombre', '?')
        ->set('autor', '?')
        ->set('editorial', '?')
        ->set('fechaPublicacion', '?')
        ->set('precio', '?')
        ->set('descuento', '?')
        ->where('isbn = ?')
        ->setParameter(1, $parsedBody['nombre'])
        ->setParameter(2, $parsedBody['autor'])
        ->setParameter(3, $parsedBody['editorial'])
        ->setParameter(4, $parsedBody['fechaPublicacion'])
        ->setParameter(5, $parsedBody['precio'])
        ->setParameter(6, $parsedBody['descuento'])
        ->setParameter(7, $args['isbn'])
    ;

    $result = $queryBuilder->executeStatement();

    $response->getBody()->write(json_encode($result));
    return $response->withHeader('content-type', 'application/json')
                    ->withHeader('Access-Control-Allow-Origin','*');

})->add($jsonBodyParser);


// 6. Delete a product with its details

$app->delete('/producto/{isbn}', function (Request $request, Response $response, array $args) {

    $queryBuilder = $this->get('DB')->getQueryBuilder();

    $queryBuilder
        ->delete('Productos')
        ->where('isbn = ?')
        ->setParameter(1, $args['isbn'])
    ;

    $result = $queryBuilder->executeStatement();

    $response->getBody()->write(json_encode($result));
    return $response->withHeader('content-type', 'application/json')
                    ->withHeader('Access-Control-Allow-Origin','*');

})->add($jsonBodyParser)
    ->add($authtentication);


