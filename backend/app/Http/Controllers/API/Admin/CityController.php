<?php

namespace App\Http\Controllers\API\Admin;

use App\City;
use App\Address;
use App\Task;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CityRequest;

class CityController extends Controller
{
    public function index()
    {
        $city = City::orderBy('id', 'desc')->paginate(10);
        return response($city);
    }

    public function store(CityRequest $request)
    {
        $input = $request->validated();
        City::create($input);
        return response()->json('success');
    }

    public function update(CityRequest $request, City $city)
    {
        $input = $request->validated();
        $city->update($input);
        return response()->json('success');
    }

    public function destroy(City $city)
    {
        $city->delete();
        return response()->json('success');
    }

    public function districts(City $city)
    {
        // $districts = City::find($city)->district;
        $district = $city->district;
        return response($district);
    }

    public function branches(City $city)
    {
        $branch = $city->branch()->orderBy('id', 'desc')->paginate(10);
        return response($branch);
    }

    public function couriers(City $city)
    {
        // $districts = City::find($city)->district;
        $courier = $city->courier()->orderBy('id', 'desc')->paginate(10);
        return response($courier);
    }

    public function users(City $city)
    {
        // $address = Address::select('id','user_id', 'city_id', 'name', 'description')->with('user:id,name','city:id,name')->where('city_id', $city)->orderBy('id', 'desc')->paginate(10);
        /*$user =  User::with(['address' => function ($q) use ($city) {
            $q->where('city_id', $city);
        }])->orderBy('id', 'desc')->paginate(10);
        return response($user);*/
        $user = $city->users()->orderBy('id', 'desc')->paginate(10);
        return response($user);
    }

    public function tasks(City $city)
    {
       /*$task = Task::with(['senderaddress' => $city, function ($query, $city) {
            $query->where('city_id','=', $city);
        }])->get();*/
        $task =  $city->tasks()->orderBy('id', 'desc')->paginate(10);
        return response($task);
    }

}
