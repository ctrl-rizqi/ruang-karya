<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Web\UpdateWebSettingRequest;
use App\Models\WebSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class WebSettingController extends Controller
{
    public function edit(): Response
    {
        $webSetting = WebSetting::query()->firstOrCreate([], [
            'site_title' => config('app.name'),
        ]);

        return Inertia::render('dashboard/web-settings', [
            'webSetting' => [
                'site_title' => $webSetting->site_title,
                'site_logo_url' => $webSetting->site_logo_url ? Storage::url($webSetting->site_logo_url) : null,
                'site_tagline' => $webSetting->site_tagline,
                'site_description' => $webSetting->site_description,
            ],
        ]);
    }

    public function update(UpdateWebSettingRequest $request): RedirectResponse
    {
        $webSetting = WebSetting::query()->firstOrCreate([], [
            'site_title' => config('app.name'),
        ]);

        $data = $request->validated();

        if ($request->hasFile('site_logo')) {
            // Delete old logo if exists
            if ($webSetting->site_logo_url) {
                Storage::disk('public')->delete($webSetting->site_logo_url);
            }

            $path = $request->file('site_logo')->store('site', 'public');
            $data['site_logo_url'] = $path;
        }

        $webSetting->update($data);

        return to_route('dashboard.web-settings.edit')->with('status', 'web-settings-updated');
    }
}
