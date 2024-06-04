<?php

namespace App\Providers;

use App\Models\ActiveStudents;
use App\Models\Settings;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        View::composer('*', function ($view) {
            $view->with('school_years', collect(
                array_map(function ($year) {
                    return $year . '/' . (intval($year) + 1);
                }, range(2020, 2500)),
            ));

            $view->with('generations', collect([
                'X', 'XI', 'XII'
            ]));

            $view->with("classes", collect([
                ActiveStudents::all()->pluck('class')->unique()
            ]));

            $view->with("setting", Settings::all()->first());
        });
    }
}
