<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Karya>
 */
class KaryaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->siswa(),
            'title' => fake()->sentence(5),
            'description' => fake()->optional()->paragraph(),
            'content' => fake()->paragraphs(3, true),
        ];
    }
}
