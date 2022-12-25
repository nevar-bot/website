<?php

function get_raw_data($string){
    $json = file_get_contents('./assets/data.json');
    $object = json_decode($json, true);
    if(isset($object[$string])){
        return $object[$string];
    }else return false;
};

function get_json_data($string, $formatted = false){
    if(get_raw_data($string) === false) return 'undefined';
    else {
        if(is_numeric(get_raw_data($string) && $formatted === true)){
            return number_format(get_raw_data($string), 0, '.', '.');
        }else{
            return get_raw_data($string);
        }
    }
};