<div class="main-sidebar sidebar-style-2">
    <aside id="sidebar-wrapper">
        <div class="sidebar-brand">
            <a href="{{ route('admin') }}">Simaku</a>
        </div>
        <div class="sidebar-brand sidebar-brand-sm">
            <a href="{{ route('admin') }}">SMK</a>
        </div>
        <ul class="sidebar-menu">
            <li class="menu-header">Dashboard</li>
            <li class="{{ Request::is('admin') ? 'active' : '' }}">
                <a class="nav-link" href="{{ route('admin') }}" id="route-admin"><i class="fas fa-home"></i>
                    <span>Dashboard</span></a>
            </li>


            {{-- student --}}
            <li
                class="nav-item dropdown {{ request()->path() === 'admin/student' || request()->path() === 'admin/active-student' ? 'active' : '' }}">
                <a href="#" class="nav-link has-dropdown" data-toggle="dropdown"><i class="fas fa-users"></i>
                    <span>Siswa</span></a>
                <ul class="dropdown-menu">
                    <li class="{{ request()->path() === 'admin/student' ? 'active' : '' }}">
                        <a class="nav-link" href="{{ route('admin.student.index') }}">
                            <span>Data</span></a>
                    </li>
                    <li class="{{ request()->path() === 'admin/student/active-student' ? 'active' : '' }}">
                        <a class="nav-link" href="{{ route('admin.active-student.index') }}">
                            <span>Aktif</span></a>
                    </li>
                </ul>
            </li>

            {{-- teacher --}}
            <li class="{{ request()->path() === 'admin/teacher' ? 'active' : '' }}">
                <a class="nav-link" href="{{ route('admin.teacher.index') }}"><i class="fa-solid fa-person"></i>
                    <span>Guru</span></a>
            </li>

            {{-- items and category --}}
            <li
                class="nav-item dropdown {{ request()->path() === 'admin/student' || request()->path() === 'admin/item' ? 'active' : '' }}">
                <a href="#" class="nav-link has-dropdown" data-toggle="dropdown"><i class="fa-solid fa-file"></i>
                    <span>Item & Category</span></a>
                <ul class="dropdown-menu">
                    <li class="{{ request()->path() === 'admin/item/category' ? 'active' : '' }}">
                        <a class="nav-link" href="{{ route('admin.category.index') }}">
                            <span>Category</span></a>
                    </li>
                    <li class="{{ request()->path() === 'admin/item' ? 'active' : '' }}">
                        <a class="nav-link" href="{{ route('admin.item.index') }}">
                            <span>Item</span></a>
                    </li>
                </ul>
            </li>







        </ul>

    </aside>
</div>
