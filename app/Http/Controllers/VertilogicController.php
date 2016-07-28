<?php
namespace App\Http\Controllers;

use App\Vertilogic;
use Illuminate\Http\Request;

class VertilogicController extends Controller
{
    public function index()
    {
        $items = Vertilogic::select('id','name', 'picture','description')
            ->orderBy('created_at','DESC')
            ->paginate(5);

        return $this->responseJson($items);
    }

    public function show($id)
    {
        $item = Vertilogic::findOrFail($id);

        return $this->responseJson($item);
    }

    public function store(Request $request)
    {

        $validator = \Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'picture' => 'required',
            'color' => 'required',
            'size' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'result' => $validator->messages(),
                'status' => 'error'
            ], 200);
        }

        $item = Vertilogic::create($request->except('color','size'));

        $arr = [];
        if ($request->color){
            array_push($arr, $request->color);
        }

        if ($request->size){
            array_push($arr, $request->size);
        }
        $arr = serialize($arr);
        $item->properties = $arr;
        $item->save();

        return $this->responseJson($item);

    }

    public function delete()
    {

    }

    private function responseJson($result)
    {
        return \Response::json([
            'result' => $result,
            'status' => 'success'
        ]);
    }
}