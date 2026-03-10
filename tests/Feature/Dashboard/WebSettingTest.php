<?php

use App\Models\User;
use App\Models\WebSetting;

test('guru can access web settings page', function () {
    $guru = User::factory()->guru()->create();

    $response = $this->actingAs($guru)->get(route('dashboard.web-settings.edit'));

    $response->assertOk();
});

test('guru can update web settings', function () {
    $guru = User::factory()->guru()->create();

    $response = $this->actingAs($guru)->patch(route('dashboard.web-settings.update'), [
        'site_title' => 'Ruang Karya SMK',
        'site_logo_url' => 'https://example.com/logo.png',
        'site_tagline' => 'Platform Karya Siswa',
        'site_description' => 'Deskripsi portal karya siswa.',
    ]);

    $response->assertRedirect(route('dashboard.web-settings.edit'));

    $this->assertDatabaseHas('web_settings', [
        'site_title' => 'Ruang Karya SMK',
        'site_logo_url' => 'https://example.com/logo.png',
        'site_tagline' => 'Platform Karya Siswa',
        'site_description' => 'Deskripsi portal karya siswa.',
    ]);
});

test('siswa cannot access web settings page', function () {
    $siswa = User::factory()->siswa()->create();

    $response = $this->actingAs($siswa)->get(route('dashboard.web-settings.edit'));

    $response->assertForbidden();
});

test('web settings page creates default row when empty', function () {
    $guru = User::factory()->guru()->create();

    WebSetting::query()->delete();

    $response = $this->actingAs($guru)->get(route('dashboard.web-settings.edit'));

    $response->assertOk();
    expect(WebSetting::query()->count())->toBe(1);
});
