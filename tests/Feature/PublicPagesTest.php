<?php

use App\Models\Karya;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('about page is accessible and shows dummy developer data', function () {
    $response = $this->get(route('about'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('about')
        ->where('developer.name', 'Tim Ruang Karya Dev')
        ->where('purpose', 'Ruang Karya dibuat untuk membantu siswa menampilkan karya terbaiknya dalam satu platform portfolio sekolah.'));
});

test('student directory page is accessible', function () {
    $response = $this->get(route('student-directory'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('student-directory'));
});

test('student directory can filter by name nisn class and major', function () {
    User::factory()->siswa()->create([
        'name' => 'Siswa RPL',
        'nisn' => '1234500001',
        'student_class' => 'XII',
        'major' => 'RPL',
    ]);

    User::factory()->siswa()->create([
        'name' => 'Siswa TKJ',
        'nisn' => '1234500002',
        'student_class' => 'XI',
        'major' => 'TKJ',
    ]);

    $response = $this->get(route('student-directory', [
        'name' => 'Siswa RPL',
        'nisn' => '0001',
        'student_class' => 'XII',
        'major' => 'RPL',
    ]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('student-directory')
        ->where('students.data.0.name', 'Siswa RPL'));
});

test('student directory does not include guru', function () {
    User::factory()->guru()->create([
        'name' => 'Guru Tampil',
        'nisn' => '0000000001',
    ]);

    User::factory()->siswa()->create([
        'name' => 'Siswa Tampil',
        'nisn' => '0000000002',
    ]);

    $response = $this->get(route('student-directory'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('student-directory')
        ->where('students.data', fn ($students): bool => collect($students)->pluck('name')->contains('Siswa Tampil')
            && ! collect($students)->pluck('name')->contains('Guru Tampil')));
});

test('guest cannot toggle like on karya', function () {
    $karya = Karya::factory()->create();

    $response = $this->post(route('karya.like.toggle', $karya));

    $response->assertRedirect(route('login'));
});
